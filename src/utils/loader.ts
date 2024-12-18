import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

import { map } from 'nanostores';

const $cache = map({});

export function getRootDir(): string {
  const rootDir = process.cwd() + path.sep;
  return rootDir;
}

export function getSrcDir(): string {
  const srcDir = getRootDir() + 'src' + path.sep;
  return srcDir;
}

export function getDataDir(): string {
  const dataDir = getRootDir() + 'data' + path.sep;
  return dataDir;
}

export function getMenuDir(): string {
  const menuDir = getDataDir() + 'menus' + path.sep;
  return menuDir;
}

export function checkVar(name: string): boolean {
  return name in $cache ? true : false;
}

export function getVar(name: string, defaultValue: unknown | null = null): unknown | null {
  if (checkVar(name)) {
    return $cache[name];
  }
  return defaultValue;
}

export function getObject(name: string): object {
  return Object.assign({}, getVar(name, {}));
}

export function setVar(name: string, value: unknown): void {
  $cache[name] = value;
}

export function addVars(name: string, values: object): void {
  for (const key in values) {
    if (!$cache[name]) {
      $cache[name] = {};
    }
    $cache[name][key] = values[key];
  }
}

export function deleteVar(name: string): void {
  if (checkVar(name)) {
    delete $cache[name];
  }
}

function* readFiles(dir: string): IterableIterator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      yield* readFiles(filePath);
    } else {
      yield filePath;
    }
  }
}

function loadText(txtFile: string): string {
  let doc: string = '';
  try {
    doc = fs.readFileSync(txtFile, 'utf8');
  } catch (error) {
    console.error('Error loading text file:', error);
  }
  return doc;
}

function loadYaml(yamlFile: string): unknown | null {
  let doc: unknown = null;
  try {
    const fileContents = fs.readFileSync(yamlFile, 'utf8');
    doc = yaml.load(fileContents);
  } catch (error) {
    console.error('Error loading YAML file:', error);
  }
  return doc;
}

export async function load(type: string): Promise<void> {
  const loadDir = getRootDir() + type + path.sep;
  const cards = {};

  for (const filePath of readFiles(loadDir)) {
    const name = filePath.replace(loadDir, '').split('.')[0];
    const ext = path.extname(filePath);
    if (ext == '.yml' || ext == '.yaml') {
      cards[name] = loadYaml(filePath);
    } else if (ext == '.js') {
      const module = await import(/* @vite-ignore */ filePath);
      addVars('js', module);
    }
  }
  setVar(type, cards);
}

export function loadFootNote(): void {
  setVar('footnote', loadText(getDataDir() + 'footnote.txt'));
}

function checkFormData(data: object) {
  for (const property in data) {
    if (Object.prototype.hasOwnProperty.call(data, property)) {
      if (Array.isArray(data[property])) {
        for (const value of data[property]) {
          if (typeof value == 'string' && value.startsWith('forms/')) {
            return true;
          }
        }
      } else if (typeof data[property] == 'object') {
        if (checkFormData(data[property])) {
          return true;
        }
      } else if (typeof data[property] == 'string') {
        if (data[property].startsWith('forms/')) {
          return true;
        }
      }
    }
  }
  return false;
}

export function checkForms(page: string): boolean {
  try {
    return checkFormData(getObject('data/nav')[page]);
  } catch (error) {
    // Do nothing
    console.log(error.message);
  }
  return false;
}
