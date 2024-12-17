# Site Content Header Components

Content Header Components panels are displayed in the **ContentHeader** component at the top before the **Banner** section.

Data cards can be arranged in nested directories. If they are nested then
it is important to keep in mind that their name will match the nested directory path.

_For example:_

- Top level directory: headers/<**name**>.yaml

  - _type_: **name**

- Nested directory: headers/<**category/subcategory/name**>.yaml
  - _type_: **category/subcategory/name**

## Content Header Component Page Location

- Page
  - ContentHeader
    - **type** _(headers/{name[/{name}]...}.yaml)_
    - banner _(banners{name[/{name}]...}.yaml)_
    - stats _(stats/{name[/{name}]...}.yaml)_

## Content Header Component Data Definition

Default Astro Component Type: **Hero**
Data Properties:

- **astroType** <string> _(Hero|Hero2|HeroText)_
- **image** <Image> _(Hero|Hero2)_
- **content** <text> _(all)_
- **actions[]** <array[Action]> _(Hero|Hero2)_
- **callToAction** <Action> _(HeroText)_
- **callToAction2** <int> _(HeroText)_

## Sub Components

- **Image**

  - src <string>
  - alt <string>

- **Action**
  - variant <string> <primary|secondary|tertiary|link>
  - type <string> <button|submit|reset>
  - text <text>
  - icon <string> <:tabler>
  - href <url>
  - target <string> <\_blank>
