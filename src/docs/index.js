import React from 'react'
import reactDOM from 'react-dom'
import { Form, Header, Label, Input, Container, Button, Dropdown, Modal, Checkbox } from 'semantic-ui-react'

import { Validator } from '../lib/index'

//this is a custom rule
const providerOptions = [
  {
    text: 'AWS',
    value: 'amazon'
  },
  {
    text: 'Azure',
    value: 'azure'
  }
]

const fields = {
  none: {
    cloudProvider: {
      name: 'cloudProvider',
      rules: [],
      required: true
    }
  },
  amazon: {
    cloudProvider: {
      name: 'cloudProvider',
      rules: [],
      required: true
    },
    accessKey: {
      name: 'accessKey',
      rules: [],
      required: true
    },
    secretKey: {
      name: 'secretKey',
      rules: [],
      required: true
    },
    endpoint: {
      name: 'endpoint',
      rules: [],
      required: true
    },
    friendlyName: {
      name: 'friendlyName',
      rules: [],
      required: true
    },
    zoneType: {
      name: 'zoneType',
      rules: [],
      required: true
    }
  },
  azure: {
    cloudProvider: {
      name: 'cloudProvider',
      rules: [],
      required: true
    },
    clientId: {
      name: 'clientId',
      rules: [],
      required: true
    },
    clientSecret: {
      name: 'clientSecret',
      rules: [],
      required: true
    },
    accessKey: {
      name: 'accessKey',
      rules: [],
      required: true
    },
    regionCode: {
      name: 'regionCode',
      rules: [],
      required: true
    },
    subscriberId: {
      name: 'subscriberId',
      rules: [],
      required: true
    },
    tenantId: {
      name: 'tenantId',
      rules: [],
      required: true
    },
    importExisting: {
      name: 'importExisting',
      rules: [],
      required: true
    },
    friendlyName: {
      name: 'friendlyName',
      rules: [],
      required: true
    },
    zoneType: {
      name: 'zoneType',
      rules: [],
      required: true
    }
  }
}

// const BIND_CLOUD = gql`
//   mutation bindCloud($zoneType: String!, $friendlyName: String!, $config: MorpheusCloudConfig) {
//     bindCloud(zoneType: $zoneType, friendlyName: $friendlyName, config: $config) {
//       id
//     }
//   }
// `

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cloudProvider: 'amazon'
    }

    this.onDropdownChange = this.onDropdownChange.bind(this)
  }

  onDropdownChange(event, data) {
    this.setState({ cloudProvider: data.value })
  }

  renderErrors = errors => {
    if (!errors) return
    return errors.map((error, i) => {
      return (
        <Label color="red" key={i}>
          {error}
        </Label>
      )
    })
  }

  render() {
    return (
      <Container>
        <Modal trigger={<Button color="blue">Bind cloud</Button>}>
          <Modal.Content>
            <Header as="h2">Bind cloud</Header>
            <Validator parent={this} fields={fields[this.state.cloudProvider] || fields.none} validateOnLoad={false}>
              {({ isFormValid, isFieldValid, errors, onChange }) => {
                return (
                  <Form>
                    <Form.Field width="5">
                      <Form.Dropdown
                        name="cloudProvider"
                        label="Cloud provider"
                        selection
                        placeholder={'Select a provider'}
                        options={providerOptions}
                        onChange={onChange}
                      />
                    </Form.Field>
                    {/* {this.renderErrors(errors.cloudProvider)} */}
                    <Form.Field width="5">
                      <Form.Input name="friendlyName" label="Friendly name" onChange={onChange} />
                      {/* {this.renderErrors(errors.friendlyName)} */}
                    </Form.Field>

                    {this.state.cloudProvider === 'amazon' && (
                      <React.Fragment>
                        <Form.Field width="5">
                          <Form.Input name="accessKey" label="Access key" onChange={onChange} />
                          {/* {this.renderErrors(errors.accessKey)} */}
                        </Form.Field>
                        <Form.Field width="5">
                          <Form.Input name="secretKey" label="Secret key" onChange={onChange} type="password" />
                          {/* {this.renderErrors(errors.secretKey)} */}
                        </Form.Field>
                        <Form.Field width="5">
                          <Form.Select
                            name="endpoint"
                            label="Endpoint"
                            selection
                            placeholder={'Select an endpoint'}
                            options={[{ text: 'Option A', value: 'A' }, { text: 'Option B', value: 'B' }]}
                            onChange={onChange}
                          />
                          {/* {this.renderErrors(errors.endpoint)} */}
                        </Form.Field>
                      </React.Fragment>
                    )}
                    {this.state.cloudProvider === 'azure' && (
                      <React.Fragment>
                        <Form.Field width="5">
                          <Form.Input name="accessKey" label="Access key" onChange={onChange} />
                          {/* {this.renderErrors(errors.accessKey)} */}
                        </Form.Field>
                        <Form.Field width="5">
                          <Form.Input name="clientId" label="Client ID" onChange={onChange} />
                          {/* {this.renderErrors(errors.clientId)} */}
                        </Form.Field>
                        <Form.Field width="5">
                          <Form.Input name="clientSecret" label="Client secret" type="password" onChange={onChange} />
                          {/* {this.renderErrors(errors.clientSecret)} */}
                        </Form.Field>
                        <Form.Field width="5">
                          <Form.Input type="text" label="Location" name="regionCode" onChange={onChange} />
                          {/* {this.renderErrors(errors.regionCode)} */}
                        </Form.Field>
                        <Form.Field width="5">
                          <Form.Input name="subscriberId" label="Subscriber Id" type="text" onChange={onChange} />
                          {/* {this.renderErrors(errors.subscriberId)} */}
                        </Form.Field>
                        <Form.Field width="5">
                          <Form.Input name="tenantId" label="Tenant ID" type="text" onChange={onChange} />
                          {/* {this.renderErrors(errors.tenantId)} */}
                        </Form.Field>
                        <Form.Field width="5">
                          <Checkbox
                            name="importExisting"
                            label="Import existing instances"
                            // type="checkbox"
                            // onChange={onChange}
                            onClick={e => {
                              onChange({ target: { name: 'importExisting', value: !this.state.importExisting } })
                            }}
                          />
                          {/* {this.renderErrors(errors.importExisting)} */}
                        </Form.Field>
                      </React.Fragment>
                    )}
                    {/* <Mutation
                      mutation={BIND_CLOUD}
                      onCompleted={data => toastie.success(data)}
                      onError={error => {
                        toastie.error(`There was an error: ${error}`)
                      }}
                    >
                      {(bind, { called, loading }) => (
                        <Form.Field>
                          <Button
                            color="green"
                            disabled={!isFormValid || this.state.cloudProvider === 'none' || loading}
                            onClick={e => {
                              e.preventDefault()
                              const config =
                                this.state.cloudProvider === 'amazon'
                                  ? {
                                      accessKey: this.state.accessKey,
                                      secretKey: this.state.secretKey,
                                      endpoint: this.state.endpoint
                                    }
                                  : {
                                      accessKey: this.state.accessKey,
                                      clientId: this.state.clientId,
                                      clientSecret: this.state.clientSecret,
                                      tenantId: this.state.tenantId,
                                      subscriberId: this.state.subscriberId,
                                      regionCode: this.state.regionCode,
                                      importExisting: this.state.importExisting
                                    }
                              bind({
                                variables: {
                                  zoneType: this.state.cloudProvider,
                                  friendlyName: this.state.friendlyName,
                                  config
                                }
                              })
                            }}
                          >
                            Bind
                          </Button>
                        </Form.Field>
                      )}
                    </Mutation> */}
                  </Form>
                )
              }}
            </Validator>
          </Modal.Content>
        </Modal>
      </Container>
    )
  }
}

reactDOM.render(<App />, document.getElementById('root'))
