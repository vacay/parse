
TESTS = tests/*.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 60000 \
		--growl \
		$(TESTS)