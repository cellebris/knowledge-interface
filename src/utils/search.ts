import type { Schemas } from '@qdrant/js-client-rest';
import { QdrantClient } from '@qdrant/js-client-rest';
import { stripHtml } from 'string-strip-html';

import { getObject } from './loader';

function getQdrant(): QdrantClient {
  return new QdrantClient({
    https: import.meta.env.QDRANT_HTTPS?.toLowerCase?.() === 'true' ? true : false,
    host: import.meta.env.QDRANT_HOST,
    port: import.meta.env.QDRANT_PORT,
    apiKey: import.meta.env.QDRANT_API_KEY,
  });
}

export async function getCollection() {
  return await getQdrant().getCollection(import.meta.env.QDRANT_COLLECTION);
}

async function search({ embeddings, filterField, filterValues, limit = 10 }): Promise<Array<object>> {
  const client = getQdrant();

  const searchQueries: Array<Schemas['SearchRequest']> = [];
  const results: Array<object> = [];
  const index: Record<string, boolean> = {};
  let filters: object | null = null;

  if (filterField && filterValues) {
    filters = {
      must: [
        {
          key: filterField,
          match: {
            any: filterValues,
          },
        },
      ],
    };
  }
  for (const embedding of embeddings) {
    searchQueries.push({
      vector: embedding,
      limit: limit,
      filter: filters,
      with_payload: ['type', 'name', 'topics'],
      with_vector: false,
      score_threshold: parseFloat(import.meta.env.QDRANT_MIN_SCORE),
    });
  }
  const batches = await client.searchBatch(import.meta.env.QDRANT_COLLECTION, {
    searches: searchQueries,
    timeout: 14400,
  });
  batches.map((batch) => {
    batch.map((result) => {
      if (!(result['id'] in index)) {
        results.push(result);
        index[result['id']] = true;
      }
    });
  });
  results.sort((a, b) => b['score'] - a['score']);
  return results;
}

function rankComponents(searchResults: Array<object>): Array<object> {
  const components: Array<object> = [];
  const scoreIndex: Record<string, Array<number>> = {};
  let resultCount: number = 0;

  searchResults.map((result) => {
    const type = result['payload']['type'];
    const name = result['payload']['name'];
    const score = result['score'];

    if (!(name in scoreIndex)) {
      scoreIndex[`${type}:${name}`] = [score];
    } else {
      scoreIndex[`${type}:${name}`].push(score);
    }
    resultCount++;
  });
  for (const [id, scores] of Object.entries(scoreIndex)) {
    const [type, name] = id.split(':');
    let statements: Array<string> = [];

    const data = getObject(type)[name];
    if (data) {
      const collectedStatements = collectStatements(data);

      if (collectedStatements.length > 0) {
        statements = collectedStatements;
      }
    }
    if (statements.length > 0) {
      const meanScore: number = scores.reduce((a, b) => a + b) / scores.length;
      const totalStatements: number = Math.min(statements.length, resultCount);
      const saturation: number = scores.length / totalStatements;

      components.push({
        type: type,
        name: name,
        score: meanScore * saturation,
        statements: statements,
      });
    }
  }
  components.sort((a, b) => b['score'] - a['score']);
  return components;
}

async function select(queryInfo: object | null, type: string, limit: number = 1): Promise<Array<object>> {
  let results: Array<object> | undefined = undefined;
  let selected: Array<object> = [];

  if (queryInfo === null) {
    return [];
  }
  if (queryInfo && queryInfo['embeddings']) {
    results = await search({
      embeddings: queryInfo['embeddings'],
      filterField: 'type',
      filterValues: [type],
    });
  }
  if (results && results.length > 0) {
    const components = rankComponents(results);

    if (limit == 1) {
      selected = components.length > 0 ? [components[0]] : [];
    } else {
      for (let index = 0; index < components.length; index++) {
        if (index < limit) {
          selected.push(components[index]);
        } else {
          break;
        }
      }
    }
  }
  return selected;
}

export async function selectBanner(queryInfo: object | null): Promise<string | undefined> {
  const components = await select(queryInfo, 'src/data/banners');
  return components.length > 0 ? components[0]['name'] : undefined;
}

export async function selectNote(queryInfo: object | null): Promise<string | undefined> {
  const components = await select(queryInfo, 'src/data/notes');
  return components.length > 0 ? components[0]['name'] : undefined;
}

export async function selectStats(queryInfo: object | null): Promise<string | undefined> {
  const components = await select(queryInfo, 'src/data/stats');
  return components.length > 0 ? components[0]['name'] : undefined;
}

export async function selectFAQ(queryInfo: object | null): Promise<string | undefined> {
  const components = await select(queryInfo, 'src/data/faq');
  return components.length > 0 ? components[0]['name'] : undefined;
}

export async function selectComponents(queryInfo: object | null, count: number = 5): Promise<Array<string>> {
  const components = await select(queryInfo, 'src/data/components', count);
  const statementIndex: Record<string, boolean> = {};
  const names: Array<string> = [];

  if (components.length > 0) {
    for (const component of components) {
      let includeComponent: boolean = true;

      for (const statement of component['statements']) {
        if (statement in statementIndex) {
          includeComponent = false;
        } else {
          statementIndex[statement] = true;
        }
      }
      if (includeComponent) {
        names.push(component['name']);
      }
    }
  }
  return names;
}

function collectStatements(component: unknown, minWords: number = 3): Array<string> {
  const statements: Array<string> = [];

  if (component !== null) {
    if (Array.isArray(component)) {
      for (const value of component) {
        statements.push(...collectStatements(value, minWords));
      }
    } else if (typeof component === 'object') {
      for (const [_key, value] of Object.entries(component)) {
        statements.push(...collectStatements(value, minWords));
      }
    } else if (typeof component === 'string') {
      const text = stripHtml(component).result;
      if (text) {
        const words = text.split(/\s+/);
        if (words.length >= minWords) {
          statements.push(text);
        }
      }
    }
  }
  return statements;
}
