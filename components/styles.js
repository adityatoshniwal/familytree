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
    loginRootBox: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
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
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
    },
    wrapperBox : {
        flexGrow: 1,
        overflow: 'auto'
    },
    searchBoxContainer: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    searchBoxButton: {
        paddingLeft: '0',
        paddingRight: '0',
    },
    searchData: {
        margin: '0.5rem 0rem;'
    },
    shareButton: {
        color: theme.palette.primary.contrastText,
        textTransform: 'none'
    },
    profileHeader: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1),
    },
    personChip: {
        margin: '2px',
    },
    profileBody: {
        padding: theme.spacing(1),
    },
    profileCard: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    profileTextLabel: {
        color: theme.palette.primary.main,
        fontSize: '0.75rem'
    },
    profileText: {

    },
    notAvaialableBox: {
        display: 'flex',
        padding: theme.spacing(1),
    }
}));

export default appStyles;