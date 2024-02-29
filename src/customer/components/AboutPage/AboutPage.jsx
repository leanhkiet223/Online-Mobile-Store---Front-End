import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import {Element, animateScroll as scroll } from 'react-scroll';
import tinh from "../../../static/images/members/tinh.jpg"

const TeamMember = ({ name, position, bio, image }) => (
  <a href='https://www.facebook.com/tvt987/' className="flex flex-col items-center mb-8">
    <img src={image} alt={name} className="w-32 h-32 object-cover rounded-full mb-4" />
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h2>
    <p className="text-sm text-gray-600 dark:text-gray-400">{position}</p>
    <p className="text-gray-700 dark:text-gray-300 mt-2">{bio}</p>
  </a>
);

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Trương Văn Tình',
      position: 'Member',
      bio: '',
      image: tinh,
    },
    {
        name: 'John Doe',
        position: 'CEO',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg',
      },
      {
        name: 'John Doe',
        position: 'CEO',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg',
      },
      {
        name: 'John Doe',
        position: 'CEO',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg',
      },
      {
        name: 'John Doe',
        position: 'CEO',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg',
      },
      {
      name: 'John Doe',
      position: 'CEO',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg',
    },
    // Add more team members as needed
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <section className="container mx-auto p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
  <Parallax
    bgImage="https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg"
    strength={500}
    style={{
      width: '100%',
      height: '400px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      className="w-full h-full rounded-lg shadow-lg"
      style={{
        backgroundImage: 'url(https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
    />
  </Parallax>
</div>
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              Welcome to <br /> <span className="text-blue-500">ONLINE MOBILE STORE</span>
            </h1>
            <p className="text-lg leading-7 text-gray-700 dark:text-gray-300">
            At Online Mobile Store, we take pride in being the leading online shopping destination for tech enthusiasts and mobile lovers. With a diverse catalog, top-notch quality, and excellent customer service, we commit to providing a unique and engaging shopping experience for our customers.
            </p>
            <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex items-center mt-6">
              <Link
                to="/products"
                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 mr-4">
                Explore Products
              </Link>
              <a
                href="#contactus"
                className="inline-block px-6 py-3 text-gray-800 border border-gray-800 rounded-md hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div id='contactus' className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
