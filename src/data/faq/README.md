# Site FAQ Components

FAQ Components are displayed in the **ContentFooter** component at the top before the **Call To Action** section.

Data cards can be arranged in nested directories. If they are nested then
it is important to keep in mind that their name will match the nested directory path.

_For example:_

- Top level directory: faq/<**name**>.yaml

  - _faq_: **name**

- Nested directory: faq/<**category/subcategory/name**>.yaml
  - _faq_: **category/subcategory/name**

## FAQ Component Page Location

- Page
  - ContentFooter
    - **faq** _(faq/{name[/{name}]...}.yaml)_
    - type _(cta/{name[/{name}]...}.yaml)_
    - contact _(contact/{name[/{name}]...}.yaml)_

## FAQ Component Data Definition

Default Astro Component Type: **FAQs**
Data Properties:

- **astroType** <string> <FAQs>
- **title** <string> _(all)_
- **subtitle** <string> _(all)_
- **tagline** <string> _(all)_
- **items[]** <array[Item]> _(all)_
- **columns** <int> _(all)_

## Sub Components

- **Item**

  - title <string>
  - subtitle <string>
  - description <text>
  - icon <string> <:tabler>
  - callToAction <Action>

- **Action**
  - variant <string> <primary|secondary|tertiary|link>
  - type <string> <button|submit|reset>
  - text <text>
  - icon <string> <:tabler>
  - href <url>
  - target <string> <\_blank>
