# This directory contains **site data cards**

Site data cards contain all of the valuable content and categorization of website content but none of the presentation. The intention is to provide a means of quickly and continuously generating complete websites as data and using them as data for inputs to other systems, such as AI agents.

These data cards take two forms:

## 1. **Reusable Components**

Reusable components are any component that lives within a webpage. These are data objects encapsulated by an Astro component presentation layer. We want to be able to reuse these components across pages and update in a single location to ensure the message is synced across the site.

Reusable components take several forms currently:

- **Header** (data/headers) - _The hero section after the top navigation bar on the webpage_
- **Banner** (data/banners) - _An optional banner under the hero section on the webpage_
- **Stats** (data/stats) - _An optional collection of relevant statistics to the topic being presented on the webpage_
- **Content Components** (data/components) - _Various user defined components ordered into the content section of the webpage_
- **FAQ** (data/faq) - _A collection of frequently asked questions_
- **Call To Action** (data/cta) - _A call to action_
- **Contact** (data/contact) - _A contact or help display_

These components are all integrated into the webpage rendering in both human presentable form and machine readable form.

Each component type listed about has a corresponding data directory with a README where data cards are stored for that type. You can nest directories and create an arbitrary folder structure that makes sense for the topic and architecture.

Consult with the type **README** file in the root directory of every component type for information on the various data definitions and ordering within the webpage.

Data cards can be arranged in nested directories. If they are nested then it is important to keep in mind that their name will match the nested directory path.

_For example:_

- Top level directory: banners/<**name**>.yaml

  - _banner_: **name**

- Nested directory: banners/<**category/subcategory/name**>.yaml
  - _banner_: **category/subcategory/name**

For more information on component data cards, check out their **{type}/README**

## 2. **Navigation Pages**

We define website pages as data cards that contain references to component data cards. This means we can reuse a lot of our work and create more engaging and complete webpages.

When a navigation page exists within the **_nav_ data directory** for the current path being requested the system loads the data card that matches and renders that generated page instead of any hard coded Astro page. This allows for gradual replacement of hard coded Astro pages as the depth of components gets more mature.

Navigation pages defined certain information such as header and footer information, components to list on the page, and meta information like site title. Within these page data cards, other component data cards are referenced that are rendered together upon request.

Data cards can be arranged in nested directories. If they are nested then it is important to keep in mind that their name will match the nested directory path.

_For example:_

- Top level directory: nav/<**name**>.yaml

  - https://example.com/**name**
  - https://example.com/data/**name**

- Nested directory: nav/<**category/subcategory/name**>.yaml
  - https://example.com/**category/subcategory/name**
  - https://example.com/data/**category/subcategory/name**

For more information on nav data cards, check out the **nav/README**
