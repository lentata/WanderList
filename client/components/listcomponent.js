import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class ListComponent extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { list } = this.props;
    return(
        <div className="list_main_container">
          <img className="img-thumbnail list_image_container" src={list.content[0].image } />

          <div className="list_overview_container">
              <Link to={ "/lists/" + list._id } className="media-heading list_overview_title">
                { list.title }
              </Link>

            <div className="list_overview_inner fa fa-user">
              &nbsp;<Link to={'/userProfile/' + this.props.list.authorId}>{list.author ? list.author : "¯\\_(ツ)_/¯"}</Link>
            </div>

            <div className="list_overview_inner fa fa-clock-o">
              &nbsp;created {moment(list.createdAt).fromNow()}
            </div>

            <div className="list_overview_inner fa fa-commenting">
              &nbsp;{list.comments.length > 1 ? list.comments.length + " comments" : list.comments.length === 1 ? "1 comment" : "no comments"}
            </div>
            <div className="list_overview_cats">
              <span>
                {list.categories.map((category, i) => {
                  return (
                    <Link key={i} to={"/categoryPage/" + category}>
                      <span className="label label-default">
                        { category }
                      </span>
                    </Link>
                  );
                })}
              </span>
            </div>
          </div>
        </div>
    );
  }
}




//
// import React, { Component } from 'react';
// import { Link } from 'react-router';
// import moment from 'moment';
//
// export default class ListComponent extends Component {
//   constructor(props){
//     super(props);
//   }
//   render(){
//     const { list } = this.props;
//     return(
//         <div className="col-md-10" >
//
//           <div className="col-md-5">
//             <div className="list_thumbnail">
//               <img className="img-thumbnail list_image_container" src={list.content[0].image } />
//             </div>
//           </div>
//
//           <div className="col-md-5 list_overview_container">
//               <Link to={ "/lists/" + list._id } className="media-heading">
//                 { list.title }
//               </Link>
//
//               <div>
//                 {/*<span className="glyphicon glyphicon-user"> {list.author} &nbsp;</span>*/}
//                 <span className="fa fa-user"/>
//                 <span><Link to={'/userProfile/' + this.props.list.authorId}> {list.author ? list.author : "¯\\_(ツ)_/¯"} &nbsp;</Link></span>
//                 <span className="fa fa-clock-o"/>
//                 <span> {moment(list.createdAt).fromNow()} &nbsp;</span>
//                 <span className="fa fa-commenting"/> <span>{list.comments.length > 1 ? list.comments.length+" comments" : list.comments.length === 1 ? 1+" comment" : "leave a comment!"}</span>
//               </div>
//
//               <div>
//                 <span>
//                   {list.categories.map((category, i) => {
//                     return (
//                     <Link key={i} to={"/categoryPage/" + category}>
//                       <span className="label label-default">
//                         { category }
//                       </span>
//                     </Link>);
//                   })}
//                 </span>
//               </div>
//
//           </div>
//         </div>
//     );
//   }
// }
