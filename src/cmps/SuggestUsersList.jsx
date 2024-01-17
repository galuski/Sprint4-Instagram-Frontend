import SuggestUserPreview from "./UserPreview";
import { useSelector } from "react-redux";

export function SuggestUsersList({ users }) {
    const loggedUser = useSelector(storeState => storeState.userModule.user);

    // Filter users where the user is not the loggedUser
    const suggestedUser = users.filter(user => user._id !== loggedUser._id);

    return (
        <>
            <h4 className="suggest-title">Suggested to you</h4>
            {suggestedUser.map(user => (
                <SuggestUserPreview key={user._id} user={user}/>
            ))}
        </>
    );
}
