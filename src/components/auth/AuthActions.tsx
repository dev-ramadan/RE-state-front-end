import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

type AuthActionsProps = {
  actionFor: string;
  isLoading?: boolean;
};
function AuthActions({ actionFor, isLoading }: AuthActionsProps) {
  return (
    <>
      {/* sign in / Signup*/}
      <Button variant="primary" type="submit">
        {isLoading ? <SpinnerMini /> : actionFor}
      </Button>
      {/* divider */}
      {/* <Divider></Divider> */}
      {/* google login */}
      {/* <Button variant="secondary" type="button">
        <Google />
        <span className="font-medium text-gray-700">continue with Google</span>
      </Button> */}
    </>
  );
}

export default AuthActions;
