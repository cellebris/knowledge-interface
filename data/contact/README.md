# Site Contact Information

Contact Information panels are displayed in the **ContentFooter** component below the **CallToAction** section.

Data cards can be arranged in nested directories. If they are nested then
it is important to keep in mind that their name will match the nested directory path.

_For example:_

- Top level directory: contact/<**name**>.yaml

  - _contact_: **name**

- Nested directory: contact/<**category/subcategory/name**>.yaml
  - _contact_: **category/subcategory/name**

## Contact Information Component Page Location

- Page
  - ContentFooter
    - faq _(faq/{name[/{name}]...}.yaml)_
    - type _(cta/{name[/{name}]...}.yaml)_
    - **contact** _(contact/{name[/{name}]...}.yaml)_

## Contact Information Component Data Definition

Default Astro Component Type: **Steps2**
Data Properties:

- **astroType** <string> <Steps|Steps2|Content|Features|Features2|Features3|CallToAction>
- **title** <string> _(all)_
- **subtitle** <string> _(all)_
- **tagline** <string> _(all)_
- **items[]** <array[Item]> _(Steps|Steps2|Features|Features2|Features3|Content)_
- **image** <Image> _(Steps|Steps2|Features|Features2|Features3|Content)_
- **content** <text> _(Content)_
- **callToAction** <Action> _(Steps|Steps2|Content)_
- **columns** <int> _(Content)_
- **actions[]** <array[Action]> _(CallToAction)_

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
