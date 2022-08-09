# Q (Queuing System App)
## Website: https://vmuljo.github.io/q/
### Created a program aimed to solve customer dissatisfaction caused by wasting time trying to find an available associate for extended assistance

This program is very similar to Yelp waitlist software, which allows customers/guests to add their name and contact information into a waitlist in order to be seated. Q is intended for similar purposes, specifically retail environments, and allow admins/employees to edit the queue, view each guests contact information, and add/remove a guest.

Current Features:

    Guests:
    - Add to Queue using name and number

    Admins:
    - Add to Queue using guest's name and number
    - Remove first entry from queue
    - Clear queue
    - Lock/unlock queue when in guest mode
    - View a guest's queue spot, phone number, and status
    - Remove guest from queue either in information modal or next to guest name

    To add:
    - Admin entry/login to remove people from queue (simple pin code)
    - if initial person is not available, tend to next person
        - if after 5 min first person not avail, remove from q;
        
    Less important:
        - Proper design