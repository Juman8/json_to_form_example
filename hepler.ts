// EXAMPLE
interface Properties {
  [key: string]: {
    type: string;
    title: string;
    [key: string]: any; // Cho phép bất kỳ thuộc tính nào khác
  };
}
export interface UISchema {
  [key: string]: {
    [key: string]: any;
  };
}
export interface FormDataType {
  [key: string]: string | number;
}

export type JSON_SCHEMA_PROPERTIES = {
  title: string;
  description: string;
  type: 'object';
  required: string[];
  properties: Properties;
};

const listCountryData = ['sdasd', 'dsadasd'];
const stateDropdown = ['sdasd', 'dsadasd'];

export const JSON_SCHEMA: JSON_SCHEMA_PROPERTIES = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name'
    },
    // dropdown
    lastName: {
      type: 'string',
      title: 'Last name',
      enum: listCountryData
    },
    // multi select
    state: {
      type: 'array',
      title: 'State',
      items: {
        type: 'string',
        enum: stateDropdown
      },
      uniqueItems: true,
      multiple: true
    },
    // select Date
    birthDay: {
      type: 'string',
      format: 'date',
      title: 'Source date'
    },
    age: {
      type: 'integer',
      title: 'Age'
    },

    bio: {
      type: 'string',
      title: 'Bio'
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 3
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10
    },
    // slecect file 
    file: {
      type: 'string',
      title: 'Logo',
      fileType: 'image/jpeg, image/webp, image/png, image/gif, image/svg+xml, image/x-icon, image/bmp'
    },
  }
};

//CUSTOME FILED UI
export const UI_SCHEMA: UISchema = {
  firstName: {
    'ui:autofocus': true,
    'ui:placeholder': 'ui:emptyValue causes this field to always be valid despite being required',
    'ui:autocomplete': 'family-name',
    'ui:enableMarkdownInDescription': true,
    'ui:description':
      'Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/).'
  },
  lastName: {
    'ui:autocomplete': 'given-name',
    'ui:enableMarkdownInDescription': true,
    'ui:description':
      'Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> '
  },
  age: {
    'ui:widget': 'updown',
    'ui:title': 'Age of person',
    'ui:description': '(earth year)'
  },
  bio: {
    'ui:widget': 'textarea'
  },
  password: {
    'ui:widget': 'password',
    'ui:help': 'Hint: Make it strong!'
  },
  telephone: {
    'ui:options': {
      inputType: 'tel'
    }
  },
  file: {
      'ui:widget': 'fileUploadWidget'
    }
};

export const FORM_DATA: FormDataType = {
  firstName: 'Chuck',
  lastName: 'Norris',
  age: 75,
  bio: 'Roundhouse kicking asses since 1940',
  password: 'noneed',
  telephone: '1-800-KICKASS'
};
