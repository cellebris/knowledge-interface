# Site Banners

Site Banners are displayed in the **ContentHeader** component, positioned below the **Header** section.

---

## Directory Structure

Data files for banners can be arranged in a flat or nested directory structure. The banner's name corresponds to the path of its YAML file without the YAML file extension.

### Examples:

- **Top-Level Directory**

  - Path: `banners/<name>.yaml`
  - **Banner Name**: `<name>`

- **Nested Directory**
  - Path: `banners/<category/subcategory/name>.yaml`
  - **Banner Name**: `<category/subcategory/name>`

---

## Component Placement

Banners are part of the `ContentHeader` component, which references multiple data sources to render a page.

### Component File Locations:

- Header
  Path: `headers/{name[/{name}]...}.yaml`

- **Banner**
  Path: `banners/{name[/{name}]...}.yaml`

- Stats
  Path: `stats/{name[/{name}]...}.yaml`

---

## Banner Data Definition

Banners use the `Features2` Astro component by default. Below are the data properties and their supported values.

### General Properties

- **`astroType`** _(string)_
  Component type. Options: `Features`, `Features2`, `Features3`, `Content`, `CallToAction`

- **`title`** _(string)_
  The banner's main title. Applicable to all types.

- **`subtitle`** _(string)_
  The banner's subtitle. Applicable to all types.

- **`tagline`** _(string)_
  A brief tagline. Applicable to all types.

### Component-Specific Properties

- **`items[]`** _(array of `Item` objects)_
  Used in: `Features`, `Features2`, `Features3`, `Content`

- **`image`** _(Image object)_
  Used in: `Features`, `Features2`, `Features3`, `Content`

- **`content`** _(text)_
  Main content body. Used in: `Content`

- **`callToAction`** _(Action object)_
  A single action link or button. Used in: `Content`

- **`columns`** _(integer)_
  Number of columns for layout. Used in: `Content`

- **`actions[]`** _(array of `Action` objects)_
  List of interactive buttons/links. Used in: `CallToAction`

---

## Sub-Components

### **Image**

Defines image properties for the banner.

- **`src`** _(string)_
  URL of the image.

- **`alt`** _(string)_
  Alternative text for accessibility.

### **Item**

Defines individual items for feature-rich banners.

- **`title`** _(string)_
  Title of the item.

- **`subtitle`** _(string)_
  Subtitle of the item.

- **`description`** _(text)_
  A detailed description.

- **`icon`** _(string)_
  Valid Tabler Icon identifier in the format tabler:{icon name}.

- **`callToAction`** _(Action object)_
  An action link or button specific to the item.

### **Action**

Defines interactive elements like buttons and links.

- **`variant`** _(string)_
  Options: `primary`, `secondary`, `tertiary`, `link`

- **`type`** _(string)_
  Button type. Options: `button`, `submit`, `reset`

- **`text`** _(text)_
  Label or text displayed on the action.

- **`icon`** _(string)_
  Valid Tabler Icon identifier in the format tabler:{icon name}.

- **`href`** _(URL)_
  URL for the action link.

- **`target`** _(string)_
  Specifies where to open the link. Options: `_blank` (new tab).
