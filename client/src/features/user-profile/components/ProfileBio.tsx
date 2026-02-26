import { User } from '../types/auth.type';

type ProfileBioProps = {
  user: User;
};

const ProfileBio = ({ user }: ProfileBioProps) => {
  return (
    <>
      <p>Klicke auf das foto um ein neues hochzuladen</p>
      <p className="text-black">
        Erstellt am{' '}
        <span className="text-black">
          {new Date(user.createdAt).toLocaleDateString('en-US')}
        </span>
      </p>
    </>
  );
};

export default ProfileBio;
