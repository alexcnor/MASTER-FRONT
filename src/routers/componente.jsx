import React from "react";

export default class Componente extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      environment: '',
      client: '',
      tipoComponente: '',
      resourceGroup: '',
      componente: '',
      vmSize: '',
      nodeNumber: 1,
      tier: '',
      version: 8,
      storage: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND}/infrastructure/create`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    let conditionalForm;
    if (this.state.tipoComponente === 'infraestructura') {
      conditionalForm =
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label htmlFor="componenteSelect">Componente</label>
            <select className="form-control" id="componenteSelect" name="componente" value={this.state.componente}
                    onChange={this.handleInputChange}>
              <option value="" disabled>Seleccione un tipo</option>
              <option value="kubernetes cluster">Kubernetes cluster</option>
              <option value="mysql">Mysql</option>
            </select>
          </div>
        </div>;
    }
    return (
      <main style={{padding: "1.5rem 2rem"}}>
        <h2>Crear Componente</h2>
        <form className="row mt-4" onSubmit={this.handleSubmit}>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label htmlFor="environmentSelect">Ambiente</label>
              <select className="form-control" id="environmentSelect" name="environment" value={this.state.environment}
                      onChange={this.handleInputChange}>
                <option value="" disabled>Seleccione un ambiente</option>
                <option value="dev">dev</option>
                <option value="qa">qa</option>
                <option value="prod">prod</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label htmlFor="clientInput">Cliente</label>
              <input type="text" className="form-control" id="clientInput" name="client" value={this.state.client}
                     placeholder="Nombre del cliente o proyecto relacionado. Ej: Core, Tecnoandina"
                     onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label htmlFor="tipoComponenteSelect">Tipo de Componente</label>
              <select className="form-control" id="tipoComponenteSelect" name="tipoComponente"
                      value={this.state.tipoComponente} onChange={this.handleInputChange}>
                <option value="">Seleccione un tipo</option>
                <option value="infraestructura">Infraestructura</option>
                <option value="servicio">Servicio</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label htmlFor="resourceGroupSelect">Grupo de Recurso</label>
              <select className="form-control" id="resourceGroupSelect" name="resourceGroup"
                      value={this.state.resourceGroup} onChange={this.handleInputChange}>
                <option value="">Seleccione un grupo</option>
                <option value="RG-Service-Catalog">RG-Service-Catalog</option>
              </select>
            </div>
          </div>
          {conditionalForm}
          {(this.state.componente === 'kubernetes cluster' && this.state.tipoComponente === 'infraestructura') &&
            <React.Fragment>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="vmSizeSelect">VM size</label>
                  <select className="form-control" id="vmSizeSelect" name="vmSize" value={this.state.vmSize}
                          onChange={this.handleInputChange}>
                    <option value="" disabled>Seleccione un tipo</option>
                    <option value="Standard_D2a_v2">Standard_D2a_v2</option>
                    <option value="Standard_D4_v3">Standard_D4_v3</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="nodeNumberSelect">Numero de Nodos</label>
                  <select className="form-control" id="nodeNumberSelect" name="nodeNumber" value={this.state.nodeNumber}
                          onChange={this.handleInputChange}>
                    <option value={null} disabled>Seleccione un numero</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
              </div>
            </React.Fragment>
          }
          {(this.state.componente === 'mysql' && this.state.tipoComponente === 'infraestructura') &&
            <React.Fragment>
              <div className="col-12 col-sm-4">
                <div className="form-group">
                  <label htmlFor="tierSelect">Tier</label>
                  <select className="form-control" id="tierSelect" name="tier" value={this.state.tier}
                          onChange={this.handleInputChange}>
                    <option value="" disabled>Seleccione</option>
                    <option value="B_Gen5_1">B_Gen5_1</option>
                    <option value="GP_Gen5_1">GP_Gen5_1</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="form-group">
                  <label htmlFor="versionSelect">Version</label>
                  <select className="form-control" id="versionSelect" name="version" value={this.state.version}
                          onChange={this.handleInputChange}>
                    <option value={null} disabled>Seleccione la version</option>
                    <option value={8}>8</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div className="form-group">
                  <label htmlFor="storageSelect">storage</label>
                  <input type="number" className="form-control" id="storageSelect" name="storage"
                         value={this.state.storage} onChange={this.handleInputChange}
                         placeholder="Almacenamiento base aprovisionado en megabytes"/>
                </div>
              </div>
            </React.Fragment>
          }
          <div className="col-12 col-sm-12">
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
          </div>
        </form>
      </main>
    );
  }
}
