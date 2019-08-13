var json = (function() {
  var json = null;
  $.ajax({
    async: false,
    global: false,
    url: "scripts/document.json",
    dataType: "json",
    success: function(data) {
      json = data;
    }
  });
  return json;
})();

$(document).ready(function() {
  var highlight = function(str, start, end) {
    return (
      str.slice(0, start - 1) +
      '<span style="color:#ffff00">' +
      str.substring(start - 1, end) +
      "</span>" +
      str.slice(-1 * (str.length - end))
    );
  };

  var random_rgba = function() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      "1" +
      ")"
    );
  };

  let editor = new Quill("#editor", {
    modules: {
      toolbar: false
    },
    theme: "snow"
  });

  var Parchment = Quill.import("parchment");

  let CustomClass = new Parchment.Attributor.Class("custom", "sentence", {
    scope: Parchment.Scope.INLINE
  });
  Quill.register(CustomClass, true);

  let CustomId = new Parchment.Attributor.Attribute("id", "id", {
    scope: Parchment.Scope.INLINE
  });
  Quill.register(CustomId);

  let CustomHintClass = new Parchment.Attributor.Attribute(
    "hintClass",
    "class",
    {
      scope: Parchment.Scope.INLINE
    }
  );
  Quill.register(CustomHintClass);

  let CustomDataToggle = new Parchment.Attributor.Attribute(
    "dataToggle",
    "data-toggle",
    {
      scope: Parchment.Scope.INLINE
    }
  );
  Quill.register(CustomDataToggle);

  let CustomDataTitle = new Parchment.Attributor.Attribute(
    "dataTitle",
    "data-title",
    {
      scope: Parchment.Scope.INLINE
    }
  );
  Quill.register(CustomDataTitle);

  let CustomDataPlacement = new Parchment.Attributor.Attribute(
    "dataPlacement",
    "data-placement",
    {
      scope: Parchment.Scope.INLINE
    }
  );
  Quill.register(CustomDataPlacement);

  let CustomDataContainer = new Parchment.Attributor.Attribute(
    "dataContainer",
    "data-container",
    {
      scope: Parchment.Scope.INLINE
    }
  );
  Quill.register(CustomDataContainer);

  editor.setText(json.text);

  var sentence_idx = 0;
  json.spans.forEach(function(sentence) {
    var length = sentence.end - sentence.start;
    var sentence_id = "sentence_" + sentence_idx;
    editor.formatText(sentence.start, length, {
      //color: random_rgba(),
      id: sentence_id
    });

    if (length > 150) {
      editor.formatText(sentence.start, length, {
        hintClass: "highlight-long-sentence",
        dataToggle: "tooltip",
        dataTitle: "This is a long sentence",
        dataPlacement: "top",
        dataContainer: "body",
        id: sentence_id
      });
    }
    sentence_idx = sentence_idx + 1;
  });

  $("#document-form").on("submit", function() {
    $("#hiddenEditor").val(editor.getText());
  });
});

$(document).ready(function() {
  // $("#tester").animate( { scrollTop: $(".ql-custom-sentence-100").offset().top - 10 }, 800, 'swing');

  $('[data-toggle="tooltip"]').tooltip({
    container: "body"
  });

  $(".collapse").collapse();
});
