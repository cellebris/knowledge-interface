# Site Page Navigation

**Page Navigation Components** define the structure of web pages on the site. The file system path for these components corresponds to the website's URL path.

### Key Notes:

- Navigation data cards can override any hardcoded Astro pages.
- Data cards may be organized in nested directories, and the file path must match the desired URL.

### Examples:

- **Top-Level Directory**
  File: `nav/<name>.yaml`
  URL: `https://example.com/<name>`

- **Nested Directory**
  File: `nav/<category/subcategory/name>.yaml`
  URL: `https://example.com/<category/subcategory/name>`

---

## Page Navigation Data Definition

The default component type for navigation data is **Landing**. Below is the structure and definitions of the supported properties.

### General Properties

- **`astroType`** _(string)_
  Specifies the component type. Options:
  `Landing`, `IndustryDetail`, `ServiceDetail`, `SoftwareDetail`, `AboutDetail`, `VideoDetail`, `Detail`, `Page`

- **`metadata`** _(object)_
  General page metadata:

  - **`title`** _(string)_
    HTML page title.
  - **`header`** _(boolean)_
    Show site header (true/false). Default is true.
  - **`footer`** _(boolean)_
    Show site footer (true/false). Default is true.

- **`components`** _(array[string])_
  Ordered list of **components** to display on the page with each item being the name of the component.

---

### Header Properties

The `header` object defines the page's header section.

- **`type`** _(string)_
  A name reference to a **headers** component selection.

- **`title`** _(string)_
  Header title.

- **`subtitle`** _(string)_
  Header subtitle.

- **`tagline`** _(string)_
  Header tagline.

- **`banner`** _(string)_
  A name reference to a **banners** component selection.

- **`stats`** _(string)_
  A name reference to a **stats** component selection.

---

### Video Properties

These properties are specific to `VideoDetail` and `AboutDetail` component types.

- **`videoId`** _(integer)_
  Youtube ID of the video.

- **`videoTitle`** _(string)_
  Title of the video.

---

### Footer Properties

The `footer` object defines the page's footer section.

- **`type`** _(string)_
  A name reference to a **cta** component selection.

- **`title`** _(string)_
  Footer title.

- **`subtitle`** _(string)_
  Footer subtitle.

- **`faq`** _(string)_
  A name reference to a **faq** component selection.

- **`faqTitle`** _(string)_
  Title for the FAQ section.

- **`contact`** _(string)_
  A name reference to a **contact** component selection.
