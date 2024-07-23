/**
 * {@link https://tailwindflex.com/@khalid/login-form-10}
 */
import React from "react";

import { Input, Button } from "../atoms";

function LoginPage() {
  return (
    <div class="dark:bg-gradient-to-l from-gray-900 to-gray-600 flex justify-center items-center w-screen h-screen p-5">
      <div class="bg-white shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
        <h1 class="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
          Dapp Penalty Login
        </h1>
        <form>
          <div class="mb-4">
            <Input type="text" placeholder="Username" />
          </div>
          <div class="mb-6">
            <Input type="password" placeholder="Password" />
          </div>
          <div class="flex items-center justify-between">
            <Button class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
