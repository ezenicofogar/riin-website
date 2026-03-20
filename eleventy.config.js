module.exports = function(eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("includes");
  eleventyConfig.setLayoutsDirectory("layouts");
  eleventyConfig.setOutputDirectory("docs");
  eleventyConfig.addPassthroughCopy("./static");
};
