import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post',
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post',
  },
  content: {
    type: 'textarea',
    label: 'Post contents',
  },
};

class PostsNew extends Component {
  // renderField(field) {
  //   const { meta: {touched, error} } = field;
  //   const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  //   return (
  //     <div className={className}>
  //       <label>{field.label}</label>
  //       <input
  //         className="form-control"
  //         type="text"
  //         {...field.input}
  //       />
  //       <div className="text-help">{touched ? error : ""}</div>
  //     </div>
  //   );
  // }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];
    console.log(fieldHelper)
    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { fields: { title, categories, content}, handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create A New Post</h3>
          {_.map(FIELDS, this.renderField.bind(this))}
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });
  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate,
})(
  connect(null, { createPost })(PostsNew)
);

