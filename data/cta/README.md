# Site Call To Action Components

Call To Action Components panels are displayed in the **ContentFooter** component between the **FAQ** and the **Contact** sections.

Data cards can be arranged in nested directories. If they are nested then
it is important to keep in mind that their name will match the nested directory path.

_For example:_

- Top level directory: cta/<**name**>.yaml

  - _type_: **name**

- Nested directory: cta/<**category/subcategory/name**>.yaml
  - _type_: **category/subcategory/name**

## Call To Action Component Page Location

- Page
  - ContentFooter
    - faq _(faq/{name[/{name}]...}.yaml)_
    - **type** _(cta/{name[/{name}]...}.yaml)_
    - contact _(contact/{name[/{name}]...}.yaml)_

## Call To Action Component Data Definition

Default Astro Component Type: **CallToAction**
Data Properties:

- **astroType** <string> <CallToAction>
- **title** <string> _(all)_
- **subtitle** <string> _(all)_
- **tagline** <string> _(all)_
- **actions[]** <array[Action]> _(all)_

## Sub Components

- **Action**
  - variant <string> <primary|secondary|tertiary|link>
  - type <string> <button|submit|reset>
  - text <text>
  - icon <string> <:tabler>
  - href <url>
  - target <string> <\_blank>
