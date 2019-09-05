import axios from 'axios';

const APIHelper = () => {
  function deleteDanceMove(id) {
    console.log('Delete clicked')
    console.log('Id: ', id)
    //Takes in dance move id and deletes based on Django delete
    axios
    .delete(`http://localhost:8000/api/dancemoves/${id}`)
    // .then(res => this.refreshList());
    }
}

export default APIHelper;


