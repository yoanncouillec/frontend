export default function (tooltipModel) {
  // Tooltip Element
  var tooltipEl = document.getElementById("chartjs-tooltip");
  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";
    document.body.appendChild(tooltipEl);
  }
  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }
  tooltipEl.className = "shadow-2xl rounded-lg bg-white w-4/12";
  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    var titleLines = tooltipModel.title || [];
    var bodyLines = tooltipModel.body.map(getBody);

    var innerHtml = "<thead>";

    titleLines.forEach(function (title) {
      innerHtml += "<tr><th>" + title + "</th></tr>";
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(function (body, i) {
      var colors = tooltipModel.labelColors[i];
      var style = "background:" + colors.backgroundColor;
      style += "; border-color:" + colors.borderColor;
      style += "; border-width: 2px";
      var span = '<span style="' + style + '"></span>';
      innerHtml += "<tr><td>" + span + body + "</td></tr>";
    });
    innerHtml += "</tbody>";

    var tableRoot = tooltipEl.querySelector("table");
    tableRoot.innerHTML = innerHtml;
  }

  // `this` will be the overall tooltip
  var position = this._chart.canvas.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = "absolute";
  tooltipEl.style.left = position.left + tooltipModel.caretX + "px";
  tooltipEl.style.top = position.top + tooltipModel.caretY + "px";
  tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
  tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
  tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
  tooltipEl.style.padding =
    tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
}
