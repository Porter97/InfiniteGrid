import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

var getUrl = window.location;
const API_ROOT = getUrl.protocol + "//" + getUrl.host + "/";

const responseBody = res => res.body;

const agent = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).then(responseBody),
};

const Images ={
    get: page =>
        agent.get(`images?page=${page}`)
};

export default {
    Images,
}