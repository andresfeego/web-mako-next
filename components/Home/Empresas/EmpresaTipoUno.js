import BarraBusquedaEmpresa from "./Header/BarraBusquedaEmpresa"
import Header from "./Header/Header"

const EmpresaTipoUno = ({empresa, municipios, empresas, slides}) => {
    return (
        <div>
            <BarraBusquedaEmpresa municipios={municipios} empresas={empresas} />
            <Header empresa={empresa} slides={slides}/>
        </div>
    )
}

export default EmpresaTipoUno