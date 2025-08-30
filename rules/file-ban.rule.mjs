import micromatch from "micromatch";

export const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
    },
    fixable: "code",
    schema: [
      {
        oneOf: [
          { type: "string" },
          {
            type: "array",
            items: { type: "string" },
            minItems: 1,
          },
        ],
      },
    ],
  },
  create(context) {
    return {
      Program: (node) => {
        const globPattern = context.options[0];
        if (!globPattern) return;

        const filename = context
          .getFilename()
          .substring(context.cwd.length + 1);
        const matches = micromatch.isMatch(filename, globPattern);

        if (!matches) return;

        context.report({
          node: node,
          message: "Filename is banned",
        });
      },
    };
  },
};
