Layouts go in this directory. For example, `_layouts/default.html` could look like this.

```HTML
{% include top.html %}

<body>
  {% include header.html %}

  {{ content }}

  {% include footer.html %}
  
</body>
```

Then any page can include the appropriate front matter to reference the layout. For example, a file named `index.html` sitting at the root of your project.

```HTML
---
layout: default
---

<div class="default">
    <p>Just getting started.</p>
</div>
```