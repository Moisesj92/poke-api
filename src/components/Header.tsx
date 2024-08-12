'use client'

import { AdjustmentsVerticalIcon, MagnifyingGlassIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
        </a>
      </nav>
    </header>
  )
}