from setuptools import setup

setup(name='ow-poll-bot',
      version='1.6.2',
      description='OpenWork Poll Operator',
      author='Digital Asset',
      license='Apache2',
      install_requires=['dazl'],
      packages=['bot'],
      include_package_data=True)
