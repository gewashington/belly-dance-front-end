import axios from 'axios';

let APIHelper = {
  // function deleteDanceMove(id) {
  //   console.log('Delete clicked')
  //   console.log('Id: ', id)
  //   //Takes in dance move id and deletes based on Django delete
  //   axios
  //   .delete(`http://localhost:8000/api/dancemoves/${id}`)
  //   // .then(res => this.refreshList());
  //   }
  getDanceMoveList() {
    axios
        .get("http://localhost:8000/api/dancemoves/")
        .then(res => { return res.data, console.log('Set state hit')})
        .catch(err => console.log(err));
  }
}

export default APIHelper;


