module.exports = function(eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("includes");
  eleventyConfig.setLayoutsDirectory("layouts");
  eleventyConfig.setOutputDirectory("docs");
  eleventyConfig.addPassthroughCopy("./static");
  eleventyConfig.setServerOptions({
    port: 8080,
    host: "0.0.0.0",
  });
};
