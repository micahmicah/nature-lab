Includes go in this directory. For example `_includes/nav.html` could look like this.

```HTML
<nav class="{{ sidebar-style }}">
    <ul>
        <li>
            <a href="#first">
                <p>First</p>
            </a>
        </li>
        <li>
            <a href="#second">
                <p>Second</p>
            </a>
        </li>
    </ul>
</nav>
```

Where `sidebar-style` is a front matter variable.

[Read more about includes](http://jekyllrb.com/docs/templates/#includes)