import { makeStyles } from '@material-ui/core/styles';
let appStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    fullBox : {
        width: '100%',
        height: '100%'
    },
    sideMenu: {
        width: 200,
    },
    body: {
        height: '100%',
        background: '#757575'
    },
    content: {
        background: '#F5F5F5',
        height: '100%',
        padding: '1rem'
    },
    appBar: {
        background: '#0277BD'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    searchData: {
        margin: '0.5rem 0rem;'
    }
}));

export default appStyles;