import { makeStyles } from '@material-ui/core/styles';
let appStyles = makeStyles((theme) => ({
    sideMenu: {
        width: 200,
    },
    loader: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    loader_text: {
        marginLeft: theme.spacing(2),
    },
    rootBox: {
        display: 'flex',
        flexDirection: 'column',
        background: '#757575',
        height: '100%'
    },
    contentBody: {
        flexGrow: 1,
        background: '#fff',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    searchResultBox : {
        flexGrow: 1,
        marginTop: theme.spacing(2),
    },
    searchData: {
        margin: '0.5rem 0rem;'
    }
}));

export default appStyles;