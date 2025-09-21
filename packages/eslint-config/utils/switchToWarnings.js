/**
 * @file These are utilities to change the severity of the rules from errors to warnings.
 *
 * When we use the recommended configurations from plugins, you may have
 * noticed they usually treat all rules as errors, and this is a fundamental
 * problem in the development experience because when all issues are flagged
 * as ”error”, you really don't know which issues will need immediate attention
 * (like app-breaking issues) versus what can wait (like missing the alt text
 * of an image).
 *
 * This situation is basically slowing you down because you're either
 * 1) spending time looking at every issue to then decide what needs
 * attention or 2) just ignoring them all, which might end up with an app
 * that won't even load, and then you'll have to go back and hunt for the
 * problem, which could take even longer!
 *
 * The idea then is simple: if it breaks the app execution or the user
 * experience, it’s truly an error, otherwise, it’s a warning.
 */

/**
 * @param {import("eslint").Linter.RuleEntry} ruleEntry
 * @returns {import("eslint").Linter.RuleEntry}
 */
export function switchRuleValueToWarning(ruleEntry) {
  return typeof ruleEntry === 'string'
    ? 'warn'
    : Array.isArray(ruleEntry)
      ? ['warn', ruleEntry[1]]
      : ruleEntry;
}

/**
 * @param {import("eslint").Linter.RulesRecord} rules
 * @param {string[]} exceptions
 * @returns {import("eslint").Linter.RulesRecord}
 */
export function switchRulesRecordToWarning(rules, exceptions = []) {
  return Object.entries(rules).reduce((list, [ruleName, ruleEntry]) => {
    return {
      ...list,
      [ruleName]: exceptions.includes(ruleName)
        ? ruleEntry
        : switchRuleValueToWarning(ruleEntry),
    };
  }, {});
}

/**
 * @param {import("eslint").Linter.Config[]} config
 * @returns {import("eslint").Linter.Config[]}
 */
export function switchConfigToWarnings(config) {
  return config.map((configItem) => ({
    ...configItem,
    rules: switchRulesRecordToWarning(configItem.rules),
  }));
}
