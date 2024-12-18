import type { LoaderConfig as Component, CallToAction, FormItem } from '~/types';
import type { MenuLink } from '~/components/widgets/Header.astro';
import type { Link, Links } from '~/components/widgets/Footer.astro';
import { supportedTypes, supportedComponents } from '~/components';
import { getVar, getObject, checkForms } from '~/utils/loader';
import { routes } from '~/utils/router';

export function getHeaderMenu(): Array<MenuLink> {
  const loadCache = getObject('data/menus');
  return loadCache['header'];
}

export function getActions(): Array<CallToAction> {
  const loadCache = getObject('data/menus');
  return loadCache['actions'];
}

export function getFooterMenu(): Array<Links> {
  const loadCache = getObject('data/menus');
  return loadCache['footer'];
}

export function getAuxMenu(): Array<Link> {
  const loadCache = getObject('data/menus');
  return loadCache['auxillary'];
}

export function getSocialMenu(): Array<Link> {
  const loadCache = getObject('data/menus');
  return loadCache['social'];
}

export function getFootNote(): string {
  return getVar('footnote', '') as string;
}

export function generate(name: string, order: undefined | string | Array<string>): Array<Component> {
  const loadCache = getObject(name);
  const formCache = getObject('data/forms');
  const allowedTypes: Array<string> = supportedComponents[name];

  const components: Array<Component> = [];

  if (name == 'data/nav') {
    console.log(`Rendering page: ${order}`);
  } else {
    console.log(`Generating ${name}: ${order}`);
  }

  if (order == undefined) {
    return [];
  }
  if (!Array.isArray(order)) {
    order = [order];
  }
  order.map((componentName) => {
    // Options:
    if (componentName.startsWith('forms/')) {
      // 1. Component is a form component and pulled from forms list
      const formName = componentName.replace(/^(forms\/)/, '');

      if (formCache[formName] != undefined) {
        formCache[formName]['name'] = formName;

        const component: Component = {
          name: formName,
          type: 'form',
          tag: supportedTypes['Form'],
          props: formCache[formName],
        };
        components.push(component);
      }
    } else if (loadCache[componentName] != undefined) {
      // 2. Component is a regular component and pulled from components list
      let astroType = loadCache[componentName].astroType;

      if (astroType != undefined) {
        delete loadCache[componentName]['astroType'];
      } else {
        astroType = allowedTypes[0];
      }

      if (loadCache[componentName].metadata) {
        delete loadCache[componentName]['metadata'];
      }
      if (allowedTypes.includes(astroType)) {
        const component: Component = {
          name: componentName,
          type: 'display',
          tag: supportedTypes[astroType],
          props: loadCache[componentName],
        };
        components.push(component);
      }
    } else {
      console.log(`Component missing for ${name}: ${componentName}`);
    }
  });
  return components;
}

function parseComponent(type: string, name: string): Record<string, unknown> {
  const definitions = generate(type, name);
  let component = {};

  if (definitions.length == 1) {
    component = {
      name: name,
      ...definitions[0].props,
    };
  }
  return component;
}

function parseComponents(type: string, names: Array<string>): Array<Record<string, unknown>> {
  const components: Array<Record<string, unknown>> = [];
  names.map((name) => {
    components.push(parseComponent(type, name));
  });
  return components;
}

export function generateData(path: string): Record<string, unknown> {
  const component: Record<string, unknown> = parseComponent('data/nav', path);

  if (component['header']) {
    component['header']['type'] = parseComponent('data/headers', component['header']['type']);
    component['header']['note'] = parseComponent('data/notes', component['header']['note']);
    component['header']['banner'] = parseComponent('data/banners', component['header']['banner']);
    component['header']['stats'] = parseComponent('data/stats', component['header']['stats']);
  }
  if (component['components']) {
    const components: Array<string> = Object.values(component['components']);
    component['components'] = parseComponents('data/components', components);
  }
  if (component['footer']) {
    component['footer']['type'] = parseComponent('data/cta', component['footer']['type']);
    component['footer']['note'] = parseComponent('data/notes', component['footer']['note']);
    component['footer']['faq'] = parseComponent('data/faq', component['footer']['faq']);
    component['footer']['contact'] = parseComponent('data/contact', component['footer']['contact']);
  }
  return component;
}

export function generateLinks(): Array<string> {
  const links: Array<string> = [];
  routes().map((card) => {
    if (card.name != 'home') {
      links.push(card.name);
    }
  });
  return links;
}

export function generateStaticLinks(): Array<string> {
  const links: Array<string> = [];
  generateLinks().map((path) => {
    if (!checkForms(path)) {
      links.push(path);
    }
  });
  return links;
}

export async function generateSite(): Promise<Record<string, unknown>> {
  const components: Record<string, unknown> = {};

  generateLinks().map((path) => {
    components[path] = generateData(path);
  });
  return components;
}

export function getFormField(formName: string, item: FormItem): Component {
  const name: string = `${formName}-${item.name}`;
  const props: Record<string, unknown> = {};

  for (const property in item) {
    if (Object.prototype.hasOwnProperty.call(item, property)) {
      if (property == 'name') {
        props[property] = name;
      } else if (property != 'type') {
        props[property] = item[property];
      }
    }
  }
  const component: Component = {
    name: name,
    type: 'field',
    tag: supportedTypes[item.type], // Ensure this resolves correctly
    props: props,
  };

  if (!component.tag) {
    console.error(`Unsupported field type: ${item.type}`);
  }

  return component;
}
