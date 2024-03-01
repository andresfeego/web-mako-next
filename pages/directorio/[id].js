

const LinkAntiguos = ({ id }) => {
    return (
        <span>Redireccionando...</span>
    );
}


export async function getServerSideProps(ctx) {

    var props = { props: {} }
    let id = '';
    try {
        id = ctx.req.url.split('?')[1].split('=')[1]
    } catch (error) {
        return {
            redirect: {
                destination: '/link-no-valido' ,
                permanent: false,
            },
        }
    
    }

    return {
        redirect: {
            destination: '/' + id ,
            permanent: false,
        },
    }


}

export default LinkAntiguos;