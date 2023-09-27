import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import {
  faEdit,
  faTimes, 
  faGear, 
  faCaretLeft,
  faCaretRight,
  faCommenting
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Devices = () => {
  return <div>
    <div>Include here a table with Devices and also actions to create/edit/delete</div>
    <div className='text-end'>
      <Button variant="primary">Add</Button>{' '}
    </div>
    <div className='mt-3'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Device Name</th>
            <th>Device Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td className='text-center'><FontAwesomeIcon icon={faEdit}/> <FontAwesomeIcon icon={faTimes}/></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td className='text-center'><FontAwesomeIcon icon={faEdit}/> <FontAwesomeIcon icon={faTimes}/></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@fat</td>
            <td className='text-center'><FontAwesomeIcon icon={faEdit}/> <FontAwesomeIcon icon={faTimes}/></td>
          </tr>
        </tbody>
      </Table>
    </div>

  </div>
}