import React, { useState, useEffect } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";

const ProfilePage = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.value);
  };

  const handleSaveChanges = () => {
    const updatedUser = {
      username,
      email,
      firstname,
      lastname,
    };
    axios
      .put(`/api/users/${user.id}`, updatedUser)
      .then((response) => {
        console.log("User updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-md">
        <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
          <Image
            src="/tree.jpg"
            alt="Profile picture"
            // layout="fill"
            objectFit="cover"
            className="rounded-full"
            height={400}
            width={400}
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {username || email}
        </h1>
        <p className="text-gray-500">{email}</p>
        <form onSubmit={handleSaveChanges} className="mt-6">
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              defaultValue={firstName}
              onChange={handleFirstNameChange}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={lastName}
              onChange={handleLastNameChange}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              defaultValue={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const id = session.user ? session.user.id : null;
  const user = {
    ...session.user,
    accessToken: session.accessToken || null,
    refreshToken: session.refreshToken || null,
    accessTokenExpires: session.accessTokenExpires || null,
  };

  return {
    props: {
      user,
    },
  };
}
