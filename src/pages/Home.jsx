import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Task Management',
    description: 'Easily create, update, and track your tasks with an intuitive interface.',
    icon: '📝',
  },
  {
    name: 'Dark Mode',
    description: 'Switch between light and dark themes for comfortable viewing in any environment.',
    icon: '🌓',
  },
  {
    name: 'Responsive Design',
    description: 'Access your tasks from any device with a fully responsive layout.',
    icon: '📱',
  },
  {
    name: 'Data Persistence',
    description: 'Your tasks are saved in your browser, so they\'ll be there when you come back.',
    icon: '💾',
  },
];

const Home = () => {
  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            A better way to manage your tasks
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Stay organized and boost your productivity with our intuitive task management application.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/tasks"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Get Started
            <ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
