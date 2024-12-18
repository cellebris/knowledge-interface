# Site Content Components

Content Components panels are displayed in the **Page** component between the **ContentHeader** and the **ContentFooter** sections.

Data cards can be arranged in nested directories. If they are nested then
it is important to keep in mind that their name will match the nested directory path.

_For example:_

- Top level directory: components/<**name**>.yaml

  - _components_: [**name**, ...]

- Nested directory: components/<**category/subcategory/name**>.yaml
  - _components_: [**category/subcategory/name**, ...]

## Content Component Page Location

- Page
  - ContentHeader
  - **components** _(components/{name[/{name}]...}.yaml)_
  - ContentFooter

## Content Component Data Definition

Default Astro Component Type: **Content**
Data Properties:

- **astroType** <string> <Content|Features|Features2|Features3|Steps|Steps2|CallToAction|Stats>
- **title** <string> _(all)_
- **subtitle** <string> _(all)_
- **tagline** <string> _(all)_
- **items[]** <array[Item]> _(Steps|Steps2|Features|Features2|Features3|Content)_
- **image** <Image> _(Steps|Steps2|Features|Features2|Features3|Content)_
- **content** <text> _(Content)_
- **callToAction** <Action> _(Steps|Steps2|Content)_
- **columns** <int> _(Content)_
- **actions[]** <array[Action]> _(CallToAction)_
- **stats[]** <array[Statistic]> _(Stats)_

## Sub Components

- **Image**

  - src <string>
  - alt <string>

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

- **Statistic**

  - title <string>
  - amount <float>
  - icon <string> <:tabler>
