module.exports = {
  template({ template }, _, { componentName, jsx }) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });
    return typeScriptTpl.ast`
    import React, { SVGProps } from 'react';

    const ${componentName} = (props: SVGProps<SVGSVGElement>) => ${jsx};

    export default ${componentName};
  `;
  },
};
