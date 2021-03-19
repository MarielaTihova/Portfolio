import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../common/constants';
import UserContext from '../../providers/UserContext';
// import Rating from '../Books/Ratings/Rating';
import './User2.css';
// import Book from '../Books/Book/Book';
import User2 from './User2';
// import Review from '../Books/Reviews/Review';
import "./ShowProfile.css"


const ShowProfile = (props) => {



	const userContext = useContext(UserContext);
	const loggedUser = userContext.user;

	const id = props.match.params['id'];
	// const path = props.location.pathname;
	// console.log("props", props);
	const [appUser, setUser] = useState({
		id: 1,
		username: "",
		personalName: "",
		email: "",
		avatar: "",

	});



	// const userContext = useContext(UserContext);
	// const loggedUser = userContext.user;

	useEffect(() => {
		if (loggedUser) {
			fetch(`${BASE_URL}/users/${loggedUser.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
				}
			})
				.then((response) => response.json())
				.then((result) => {
					console.log("request: ", result);
					if ((result.error)) {
						throw new Error(result.message);

					} else {
						setUser(result);
					}
				})
				.catch((error) => console.log(error.message))
		}
	}, [id]);



	return (

		<div className="ShowProfile">
			{loggedUser ?

				<div>
					<h3 className="row d-flex align-items-center"> Profile </h3>
					<div class="edit-details">
						{/* <form enctype="multipart/form-data" action="https://bootstrapbay.com/account/profile/edit" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="7+fwZgzJEzWmmIhJTDZd/N+HxJBA7FxdgejxmwSqFPIt5GKWXguwqx+oW3HCCeLNb7cpsbJw5Ph2Ff3rfoqrWg==" /> */}
						<div class="row">
							<div class="col-12 col-md-4 offset-md-4">
								<div class="fileinput fileinput-new d-flex" data-provides="fileinput">
									<div class="fileinput-new thumbnail">
										<img width="50px" height="50px" className="img-radius" src={appUser.avatar} alt="Generic placeholder" />
										{/* <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaybox/uploads/user/profile_pic/defaultProfile.jpg" alt="Defaultprofile" /> */}
									</div>
									<div class="fileinput-preview fileinput-exists thumbnail">
										{/* <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaybox/uploads/user/profile_pic/defaultProfile.jpg" alt="Defaultprofile" /> */}
									</div>
									<div>
										{/* <label>Member</label> */}
										<div class="btn btn-success btn-file">
											<div class="fileinput-new">Select image</div>
											<div class="fileinput-exists">Change</div>
											<input type="file" name="user[profile_pic]" id="user_profile_pic" />
										</div>
										<a href="#" class="btn btn-primary fileinput-exists" data-dismiss="fileinput">Remove</a>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-md-6">
								<label>Email Address</label>

								<input type="text" class="form-control" name="" value={appUser.email} disabled />
								<div class="d-flex info-with-icon">
									<div class="icon text-orange">
										<i class="zmdi zmdi-info-outline"></i>
									</div>
									<div class="message">
										If you want to change your email address or deactivate your account, please contact support.
								</div>
								</div>

							</div>
							<div class="col-12 col-md-6">
								<label> Username </label>
								<input type="text" class="form-control" name="" placeholder="Your Username..." value={appUser.username} disabled />
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-md-4">
								<label> Display name </label>
								<input class="form-control" placeholder="John Doe" value="" type="text" name="user[full_name]" id="user_full_name" />
							</div>
							<div class="col-12 col-md-4">
								<label> Location </label>
								<input class="form-control" placeholder="Somewhere Nice" value="" type="text" name="user[location]" id="user_location" />
							</div>
							<div class="col-12 col-md-4">
								<label> Website </label>
								<input class="form-control" placeholder="www.johndoe.com" value="" type="text" name="user[website]" id="user_website" />
							</div>
						</div>

						<label> About </label>
						<textarea id="about" class="form-control" placeholder="Write a little about yourself and/or your company." name="user[about]"></textarea>
						<div class="row">
							<div class="col-12 col-md-6">
								<div class="d-flex info-with-icon">
									<div class="icon text-orange">
										<i class="zmdi zmdi-info-outline"></i>
									</div>
									<div class="message">
										Adding details about you and your business will increase the trust that future customers invest in you.
                                </div>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="custom-control custom-checkbox mt-2">
								<input name="user[wants_reply_notification]" type="hidden" value="0" /><input class="custom-control-input" id="wants_reply_notification" type="checkbox" value="1" checked="checked" name="user[wants_reply_notification]" />
								<label class="custom-control-label" for="wants_reply_notification">
									I want to receive email notifications when someone replies to my comments.
                            </label>
							</div>
						</div>

						<div class="row">
							<div class="col-12 col-md-4">
								<label> Twitter </label>

								<div class="input-group">
									<input class="form-control" placeholder="Twitter username" value="" type="text" name="user[twitter]" id="user_twitter" />
									<div class="input-group-append social">
										<span class="input-group-text text-twitter">
											<i class="fa fa-twitter text-c-blue f-36"></i>
										</span>
									</div>
								</div>
							</div>
							<div class="col-12 col-md-4">
								<label> Facebook </label>
								<div class="input-group">
									<input class="form-control" placeholder="Facebook page or profile ID" value="" type="text" name="user[facebook]" id="user_facebook" />
									<div class="input-group-append social">
										<span class="input-group-text text-facebook">
											<i class="fa fa-facebook text-primary f-36"></i>
										</span>
									</div>
								</div>
							</div>
							<div class="col-12 col-md-4">

								<label> Google+ </label>
								<div class="input-group">
									<input class="form-control" placeholder="Google+ account ID" value="" type="text" name="user[google]" id="user_google" />
									<div class="input-group-append social">
										<span class="input-group-text text-google">
											<i class="fa fa-google-plus text-c-red f-36"></i>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="d-flex justify-content-end">
							<input type="submit" name="commit" value="Save changes" class="btn btn-success" data-disable-with="Save changes" />
						</div>


						{/* </form>	 */}
					</div>
					<div class="change-password">
						<h6> Change your password </h6>

						<form action="https://bootstrapbay.com/account/profile/edit" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="eo4E19kqScEvrYwVG64ZZYhiayMsI3bu3aoJ66FB6wa4jZYni+jqX5adXy2VkaZUOFKGAt6/zksqVwWb22FUrg==" />
							<div class="row">
								<div class="col-12 col-md-4">
									<label> Current password </label>
									<div class="input-group">
										<input class="form-control" placeholder="..." id="current" type="password" name="change_password[current_password]" />
										<div class="input-group-append toggle-password" data-password="current">
											<span class="input-group-text">
												<i class="fa fa-lock"></i>
											</span>
										</div>
									</div>
								</div>
								<div class="col-12 col-md-4">
									<label> New password </label>
									<div class="input-group">
										<input class="form-control" placeholder="..." id="new" type="password" name="change_password[new_password]" />
										<div class="input-group-append toggle-password" data-password="new">
											<span class="input-group-text">
												<i class="fa fa-lock"></i>
											</span>
										</div>
									</div>
								</div>
								<div class="col-12 col-md-4">
									<label> Confirm new password </label>
									<div class="input-group">
										<input class="form-control" placeholder="..." id="confirm-new" type="password" name="change_password[confirm_new_password]" />
										<div class="input-group-append toggle-password" data-password="confirm-new">
											<span class="input-group-text">
												<i class="fa fa-lock"></i>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="d-flex justify-content-end">
								<input type="submit" name="commit" value="Change password" class="btn btn-primary" data-disable-with="Change password" />
							</div>
						</form>
					</div>

				</div>
				: <div>
					<p> <a href="/session"> Login</a> to see your Profile</p>
				</div>}

		</div>







	)

};



export default ShowProfile;
