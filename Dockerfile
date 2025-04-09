FROM ruby:3.3

# Set working directory
WORKDIR /app

# Copy our Gemfile
COPY Gemfile ./

# Install gems from Gemfile
RUN bundle install --jobs=4

# Copy our project files
COPY . .

# Build the site
RUN JEKYLL_ENV=production bundle exec jekyll build

# Expose port 4000 for serving the built site
EXPOSE 4000

# Command to serve the static site
CMD ["bundle", "exec", "jekyll", "serve", "--skip-initial-build", "--host", "0.0.0.0", "--port", "4000"]