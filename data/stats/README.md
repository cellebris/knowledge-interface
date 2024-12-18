# Site Statistics

Site Statistics are displayed in the **ContentHeader** component below the **Banners** section.

Data cards can be arranged in nested directories. If they are nested then
it is important to keep in mind that their name will match the nested directory path.

_For example:_

- Top level directory: stats/<**name**>.yaml

  - _stats_: **name**

- Nested directory: stats/<**category/subcategory/name**>.yaml
  - _stats_: **category/subcategory/name**

## Statistics Component Page Location

- Page
  - ContentHeader
    - header _(headers/{name[/{name}]...}.yaml)_
    - banner _(banners{name[/{name}]...}.yaml)_
    - **stats** _(stats/{name[/{name}]...}.yaml)_

## Statistics Component Data Definition

Default Astro Component Type: **Stats**
Data Properties:

- **astroType** <string> <Stats>
- **title** <string> _(all)_
- **subtitle** <string> _(all)_
- **tagline** <string> _(all)_
- **stats[]** <array[Statistic]> _(all)_

## Sub Components

- **Statistic**
  - title <string>
  - amount <float>
  - icon <string> <:tabler>
