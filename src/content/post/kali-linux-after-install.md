---
title: My Kali Linux Setup {things I do after install}
publishDate: 2024-01-16
updatedDate: 2024-07-19
author: Abhinav Kumar
image:   '~/assets/images/my_kali_linux_setup.png'
excerpt: My Kali Linux Setup, things that I do / modify after installing Kali Linux.
draft: False
category: Hacking 101

---


My Kali Linux Setup, things that I configure or modify or install everytime I am setting up my machine.
This is not a must do list, this is just me who does these.

#### Table of Contents

## 1. Update and Upgrade
Not something that I do, this is something that everyone does (unkess you did a net-install or from a weekly image). I am someone who wants my machine to always be updated ( atleast in terms of software packages).
```bash
sudo apt-get update && sudo apt-get upgrade -y
```

## 2. Change Hostname
If you have downloaded VM/VBox Image and want to rename the hostname to something specific {EthicalHackX}  like me.
```bash
sudo hostnamectl set-hostname "ETHICALHACKX"
```

## 3. Change Default Repository
I must admit Kali Linux Repositories have improved alot over the years with mirrors and default CDNs. At some environments we can observe the default repository to be blocked, in organisations specally, how to escape, how to get more speed from a nearby mirror, change the default repository config, use a different mirror.

```bash
# tee will replace the contents of file as I am not appending with -a in this command.
echo "deb http://http.kali.org/kali kali-rolling main contrib non-free non-free-firmware" | sudo tee /etc/apt/sources.list
```

I prefer to enable the deb-src mirror too. So adding the deb-src to sources.

```bash
echo "deb-src http://http.kali.org/kali kali-rolling main contrib non-free non-free-firmware" | sudo tee -a /etc/apt/sources.list
```

### 3.1 Updating sources with fast mirrors

```bash
echo "deb https://mirrors.ocf.berkeley.edu/kali kali-rolling main contrib non-free" | sudo tee /etc/apt/sources.list
echo "deb-src https://mirrors.ocf.berkeley.edu/kali kali-rolling main contrib non-free" | sudo tee -a /etc/apt/sources.list

# Update the Repository after changing mirror
sudo apt update -y
```


## 4. Essential Tweaks
These are the some tweaks that I prefer on my machine, for ease of use. You may or may not need/like all of them.

### 4.1 Remove Boilerplate home directories
```bash
#!/usr/bin/bash
echo "Removing boilerplate home directories!"
mv $HOME/Downloads/* $HOME
#carefull , if you already have something in below directories, move it.
sudo rm -rf $HOME/{.vim,Downloads,Pictures,Documents,Music,Videos}
```



### 4.2 CTF Setup !!

#### Create Diretory for CTF / Attacks
```bash
mkdir -p $HOME/ctf
touch $HOME/ctf/target

mkdir -p $HOME/ctf/{htb,thm}
```

### 4.3 Disable your Lock Screen
Go to the Settings > now goto Power Manager > click on the Display tab and disable screen lockout.

### 4.4 Change your SSH Keys & default Password

```bash
cd /etc/ssh
sudo mkdir original_ssh_keys
sudo mv ssh_host_* original_ssh_keys/
sudo dpkg-reconfigure openssh-server
```

### 4.5 Configure Google DNS / OpenDNS Servers
to be edited
By using Google or OpenDNS can make your internet a bit more smooth.
The Google DNS addresses are – “8.8.8.8 and 8.8.4.4“
The OpenDNS addresses are – “208.67.222.222 and 208.67.220.220“

```bash
echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf
```

### 4.6 Enable autologin for a seamless login experience
I do this , many may find this as bad practice but.... 

```bash
#for GNOME
sudo nano /etc/gdm3/daemon.conf
#for XFCE
sudo nano /etc/lightdm/lightdm.conf
```

Within the file, find the [SeatDefaults or Seat*] section and add the following lines:

```
autologin-user=<your-username>

autologin-user-timeout=0
```


## 5. Essential Packages to Install


```bash
sudo apt install -y software-properties-common kali-archive-keyring git stow  neovim curl zsh tmux texlive-latex-recommended texlive-fonts-extra texlive-latex-extra pandoc evince seclists gobuster rlwrap dirsearch html2text gedit python3 python-is-python3 pipx golang crackmapexec netexec
```




#### 5.2 python3-pip installation
```bash
python3 -m pip install --upgrade pip
```


#### 5.4 Install Archive Managers

```bash
sudo apt-get install unrar unace p7zip zip unzip p7zip-full p7zip-rar file-roller -y
```


#### 5.5 Install Guest Additions to Enable Fullscreen, Clipboard sharing & Drag n Drop
VMware / VirtualBox / Parallels each require their own tool to make interaction and functionality better, so install respective ones.
This section will be removed soon.
```bash
#Open VM Tools
sudo apt install open-vm-tools -y
```

More Virtual Machine essential configurations to be included in coming updates.


#### 5.6 Install Java:

```bash
sudo apt install default-jdk
#OR
sudo apt-cache search openjdk

#Verify java installation by checking version
java --version

#Choose the Java Version/Provider
sudo update-alternatives --config java
sudo update-alternatives --config javac
```

#### 5.7 Install Screen Recorder
I have been using Kali in VM like environemnt where I use OBS Studio on host instead of recorder in Kali.
I will remove this section in coming time.
```bash
apt-get install recordmydesktop
```

#### 5.8 Setup Wine to use Windows apps
I rarely use this, I have dual-boot setup. Still...

```bash
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install wine32
```

#### 5.9 Install Terminal Multiplexer
Terminator / Tilix ... whatever your choice is, I am bit less technical to even know the difference, I hardly split Terminals, rather the dumb me opens a new tab in whatever the default terminal is.
```bash
sudo apt-get install terminator gnome-terminal -y
```


#### 5.10 Install Code Editor
Visual Studio Code (VS Code): ( I prefer over others)
Download the package from - https://code.visualstudio.com/#alt-downloads
```bash
sudo apt-get install -f ./code_*.deb
```

If you are Sublime fan or Atom person
```bash
sudo apt install sublime-text
sudo apt install atom
```



#### 5.11 Install VLC: (because fun is must)
```bash
sudo apt install vlc
#if VLC does not runs as expected 
sudo sed -i s/geteuid/getppid/g /usr/bin/vlc
```

### Install Aptitude, Gdebi and Synaptic
```bash
sudo apt-get install aptitude gdebi synaptic
```

#### 5.13 Install Chromium
I am now a Chrome/Chromium person more than a Mozila person so...
```bash
sudo apt-get install chromium -y
```


#### 5.14 Install/Explore different desktop environments
```bash
sudo apt install kali-desktop-gnome
sudo apt install kali-desktop-{kde|xfce|gnome......}
```

## 6. Setup some alias (command-shortcuts) for your terminal.

Getting your local WiFi or LAN IP and Tunnel IP (HTB or THM OpenVPN IP)
```bash
#alias for getting VPN IP
alias myip="ip -o -4 addr show eth0 | awk '{print \$4}' | cut -d'/' -f1"
alias tunip="ip -o -4 addr show tun0 | awk '{print \$4}' | cut -d'/' -f1"
```

Alias for common tasks
```bash
alias ins="sudo apt install -y"
alias rem="sudo apt purge -y"
alias ls="ls --color=always"
alias ll="clear && ls --color=always -rthla"
alias grep="grep --color=auto"
```
### if you created a CTF Directory like me from above

```bash
alias ctf="cd $HOME/ctf && ll"
```

```bash
#add these to .zshrc or .bashrc 
export rockyou="/usr/share/wordlists/rockyou.txt.gz" 
export rockyoutxt="/usr/share/wordlists/rockyou.txt" #if already gunzip-ed the gz archive
export wordlists="/usr/share/wordlists/"
```
We can also add some functions in bashrc or zshrc files like below.
Functions in .zshrc / .bashrc , these files are located in user folder , type cd ~/.zshrc to access or edit.

```bash
updater() {
  sudo apt update -y 2> /dev/null;
  sudo apt --fix-broken install -y 2> /dev/null;
  sudo apt upgrade -y 2> /dev/null;
  sudo apt dist-upgrade -y 2> /dev/null;
  sudo apt autoremove -y 2> /dev/null;
  sudo apt autoclean -y 2> /dev/null;
  sudo apt clean -y 2> /dev/null;
}
```

```bash
# Extract file, example. "ex archive.tar.bz2"
ex() {
    if [[ -f $1 ]]; then
        case $1 in
            *.tar.bz2)   sudo tar -xjf $1;;
            *.tar.gz)    sudo tar -xzf $1;;
            *.bz2)       sudo bunzip2 $1;;
            *.rar)       sudo rar -x $1;;
            *.gz)        sudo gunzip $1;;
            *.tar)       sudo tar -xf $1;;
            *.tbz2)      sudo tar -xjf $1;;
            *.tgz)       sudo tar -xzf $1;;
            *.zip)       sudo unzip $1;;
            *.Z)         sudo uncompress $1;;
            *.7z)        sudo 7z -x $1;;
            *)           echo $1 cannot be extracted;;
        esac
    else
        echo $1 is not a valid file
    fi
}
```


```bash
#----- Directories recon -----
#gobustdir <url>
gobustdir(){gobuster dir -u "$1" -w "/usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt" -t 200 }
```

The below functions can be added to zshrc or bashrc to ease out, remember to have the CTF directory setup ( from above), and placed the respective OpenVPN file in mentioned path, or edit the path in code below.
This is shorthand to connect to openVPN for HTB or THM as cistomize as you like.


```bash
#----- CTF's -----
#HackTheBox
htb(){
  pid=$(pgrep openvpn | sed -ne 's/\([0-9]*\)/\1/p'); sudo kill $pid
  cd $HOME/ctf/htb/
  sudo openvpn *.ovpn </dev/null &>/dev/null &
  clear
}

#TryHackMe
thm(){
  pid=$(pgrep openvpn | sed -ne 's/\([0-9]*\)/\1/p'); sudo kill $pid
  cd $HOME/ctf/thm/
  sudo openvpn *.ovpn </dev/null &>/dev/null &
  clear
}
```


### 7. Adding new user
With newer Kali Linux installs, it does asks for username when instaling Kali, yet if u need to create another user, below is how to, Why mention ? 

```bash
adduser abhinavkakku
#or to create a admin user
sudo adduser abhinavkakku sudo
```

#### Sudo privilleges for new user

```bash
sudo usermod -aG sudo abhinavkakku

```
#### Granting login shell
```bash
chsh -s /bin/zsh abhinavkakku
```

### 8. FoxyProxy Addon - Mozila

I always tend to add this addon to Browser , and ofcourse configure BurpProxy along with it.

https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/ 