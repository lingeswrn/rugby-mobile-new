import io from 'socket.io-client';
import { API_HOST, API_PORT, API_PROTOCOL } from 'react-native-dotenv';
import * as events from './events';

function getId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
let port = API_PORT;
if (port === 'false' || port === '"false"') port = false;
const socket = io(`${API_PROTOCOL}://${API_HOST}${port ? ':' + port : ''}/app`, {
  autoConnect: false,
  forceNew: false,
  randomizationFactor: 0,
  reconnection: true,
  reconnectionDelayMax: 12800000,
  reconnectionAttempts: Infinity,
  transports: ['websocket', 'polling']
})
.on('error', (err) => console.log('socket erred with: ', err));

export class Socket {
  constructor() {
    this.socket = socket;
  }
  /* request methods */

  /** create: creats a new document, returning fully saved doc (object)
   * list (string): url-friendly version of list name | [required]
   * body (object): udpates to doc | [required]
   */
  create(...args) { return this.handleEvent('create', ...args); }

  /** retrieve: runs given query, returning single document (object)
   * list (string): url-friendly version of list name | [required]
   * query (object): search filters | [required]
   * params (object):
   *   populate (any): paths to populate | ''
   *   select (string): fields to pick (or remove) from results | ''
   *   sort (any): order results by path(s) | ''
   */
  retrieve(...args) { return this.handleEvent('retrieve', ...args); }

  /** findOne: returning single document (object) matching
   * with the matching filters
   * LIST (string): url-friendly version of list name | [required]
   * FILTERS (object): search filters | [required]
   ***** This is ideal for finding a single record with an id and an additional
   ***** filter(s) in case a record should only return for a given organization
   ***** etc
   * PARAMS (object):
   *   populate (any): paths to populate | ''
   *   select (string): fields to pick (or remove) from results | ''
   */
  findOne(...args) { return this.handleEvent('findOne', ...args);}

  /** findById: convenience method, returning single document (object) matching
   * with an `_id` matching the one passed
   * list (string): url-friendly version of list name | [required]
   * query (object): search filters | [required]
   * params (object):
   *   populate (any): paths to populate | ''
   *   select (string): fields to pick (or remove) from results | ''
   *   sort (any): order results by path(s) | ''
   */
  findById(...args) { return this.handleEvent('findById', ...args); }

  /** search: queries database, returning std. paginated request response (obj)
   * list (string): url-friendly version of list name | [required]
   * params (object):
   *   limit (integer): max results length | 100
   *   query (object): search filters | {}
   *   page (integer): page number | 1
   *   parse: whether to run JSON.parse on query prior to search exec | false
   *   queryType (oneOf: [or, and, in, within]): filter construction type | and
   *   populate (any): paths to populate | ''
   *   select (string): fields to pick (or remove) from results | ''
   *   sort (any): order results by path(s) | ''
   */
  search(...args) { return this.handleEvent('search', ...args); }

  /** list: queries database, returning an array of values for filters
   * list (string): url-friendly version of list name | [required]
   * params (string): list of items requested | [required]
   */
  list(...args) { return this.handleEvent('list', ...args); }

  /** update: updates exisitng document, returning newly saved doc (object)
   * list (string): url-friendly version of list name | [required]
   * id (string): id of document being updated | [required]
   * body (object): udpates to doc | [required]
   */
  update(...args) {return this.handleEvent('update', ...args);}

  /** remove: deletes
   * list (string): url-friendly version of list name | [required]
   * id (string): id of document being updated | [required]
   */
  remove(...args) { return this.handleEvent('remove', ...args); }

  /** subDocs
  * NOTE: ALL SUB-DOC EVENTS ACCEPT THE FOLLOWING AS THEIR FIRST TWO ARGUMENTS:
  *    path (string): dot-notated path of subdoc (i.e. 'list.subDoc')
  *    doc ID (string): _id of the parent document
  *
  * SEE BELOW DOCUMENTATION FOR SPECIFIC ARGUMENTS
  */
  subDocs = (...pArgs) => ({
    /** create
    *    body (object): initial values of sub-doc to be created.
    */
    create: (...args) => this.handleEvent('sub-doc', 'create', ...pArgs, ...args ),
    /** remove
     *    sub-doc id (object): id of the sub-doc to be removed.
     */
    remove: (...args) => this.handleEvent('sub-doc', 'remove', ...pArgs, ...args ),
    /** update
     *    query (object|string): sub-doc id or `retrieve` query.
     *    update (object): sub-doc values to be updated.
     */
    update: (...args) => this.handleEvent('sub-doc', 'update', ...pArgs, ...args )
  })

  /** handle event: handles any non-standard event
   * event (string): root name of the event (i.e. without ':start')
   * ...args (series): 0-n arguments to pass to the server event handler
   * returns: Promise with result specified in handler
   */
  handleEvent(event, ...args) {
    return new Promise((resolve, reject) => {
      const reqId = getId();
      this.socket
      .on(`${reqId}:complete`, (data) => resolve(data))
      .on(`${reqId}:error`, (err) => reject(err))
      .emit(`${event}:start`, reqId, ...args);
    })
    .catch((err) => { console.error(err); return Promise.reject(err); });
  }

  /* operational methods */
  // get socket() { return socket; }
  async connect() {
    if (this.socket.disconnected) this.socket.open();
    return Promise.resolve(this.socket);
  }
  disconnect() { this.socket.close(); return Promise.resolve(); }
  /* helpers + utils */
  execEvent(event, ...args) { return events[event](...args); }
}

export const SocketService = new Socket();
