TESTS = tests/*.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 60000 \
		--growl \
		$(TESTS)

define release
    VERSION=`node -pe "require('./package.json').version"` && \
    NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
    node -e "\
        var j = require('./package.json');\
        j.version = \"$$NEXT_VERSION\";\
        var s = JSON.stringify(j, null, 4);\
        require('fs').writeFileSync('./package.json', s);" && \
    git commit -m "Version $$NEXT_VERSION" -- package.json && \
    git tag "$$NEXT_VERSION" -m "Version $$NEXT_VERSION"
endef

release-patch:
	@$(call release,patch)

release-minor:
	@$(call release,minor)

release-major:
	@$(call release,major)

publish:
	git push
	git push --tags origin HEAD:master
