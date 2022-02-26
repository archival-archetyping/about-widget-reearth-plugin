const html = `
<style>
  body {
    margin: 0;
    color: white;
    font-size: small;
  }
  .extendedh { width: 100%; }
  .extendedv { height: 100%; }
  #wrapper {
    padding: 8px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    width: 300px;
  }
  .extendedh body, .extendedh #wrapper { width: 100%; }
  .extendedv body, .extendedv #wrapper { height: 100%; }
</style>
<div id="wrapper">
  <h2 id="title"></h2>
  <h3 id="subtitle"></h3>
  <p id="description"></p>
  <img id="image">
</div>
<script>
  const cb = (widget) => {
    console.log("widget: ", widget);

    if (widget && widget.property && widget.property.default) {
      document.getElementById("title").textContent = widget.property.default.title;
      document.getElementById("subtitle").textContent = widget.property.default.subtitle;
      document.getElementById("description").textContent = widget.property.default.description;
      if (widget.property.default.image) {
        document.getElementById("image").src = widget.property.default.image;
      }
    }

    if (widget && widget.property && widget.property.extended) {
      if (widget.property.extended.horizontally) {
        document.documentElement.classList.add("extendedh");
      } else {
        document.documentElement.classList.remove("extendedh");
      }
      if (widget.property.extended.vertically) {
        document.documentElement.classList.add("extendedv");
      } else {
        document.documentElement.classList.remove("extendedv");
      }  
    }
  };

  addEventListener("message", e => {
    if (e.source !== parent) return;
    cb(e.data);
  });

  cb(${JSON.stringify(reearth.widget)});
</script>
`;

reearth.ui.show(html);

reearth.on('update', () => {
  if (reearth.widget?.property?.default) {
    reearth.ui.postMessage(reearth.widget);
  }
});
