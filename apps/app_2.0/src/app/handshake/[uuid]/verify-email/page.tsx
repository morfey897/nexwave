async function VerifyEmail({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { token: string | string[] | undefined };
}) {
	console.log('VerifyEmail', params, searchParams);
	/*
  1. The link is not expired
    - The user is logged in
      * Show confirmation message and redirect to the project
    - The user isn't logged in but they have an account
      * Show form to login (prepopulated with the email)
      * Show confirmation message and redirect to the project
    - The user has not account
      * Show button to create a new account (prepopulated with the email)
      * Show confirmation message and redirect to the project
  */
	/*
  2. The link is expired
    - The project is public
      * The user is logged in
        o Show button to request a new invitation
      * The user isn't logged in but they have an account
        o Show form to login
        o Show button to accept the invitation
      * The user has not account
        o Show button to create a new account
        o Show button to request a new invitation
    - The project is not public
      * Show message that the invitation is expired and the project is not public
  */

	return <p>Verify email</p>;
}

export default VerifyEmail;
