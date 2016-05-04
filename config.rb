###
# General configuration
###

config[:js_dir] = 'assets/js'
config[:css_dir] = 'assets/css'
config[:images_dir] = 'assets/img'
config[:fonts_dir] = 'assets/fonts'

config[:slim] = {
  sort_attrs: false,
  format: :html
}

activate :external_pipeline,
  name: :webpack,
  command: build? ? 'npm run build' : 'npm run watch',
  source: '.tmp/dist',
  latency: 1

configure :development do
  activate :livereload
end

configure :build do
  activate :asset_hash, ignore: %r{^(?!.*assets/).*}
end

###
# Helpers
###

helpers do
  def ping_helper
    'pong'
  end
end

###
# Page options, layouts, aliases and proxies
###

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

