
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, UserPlus, Mail, Crown, Shield, Star, Trash2, Edit, Search, Calendar, Clock, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Team {
  id: string;
  name: string;
  role: 'Captain' | 'Vice Captain' | 'Player';
  members: number;
  matches: number;
  wins: number;
  created: string;
  description?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Captain' | 'Vice Captain' | 'Player';
  position: string;
  joinDate: string;
  avatar: string;
}

interface Invitation {
  id: string;
  email: string;
  teamName: string;
  status: 'pending' | 'accepted' | 'declined';
  sentDate: string;
}

interface UpcomingMatch {
  id: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  type: 'friendly' | 'tournament' | 'league';
  status: 'confirmed' | 'pending';
}

export const PlayerTeam = () => {
  const { user } = useAuth();
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>([]);

  // Initialize data
  useEffect(() => {
    const initialTeams: Team[] = [
      {
        id: '1',
        name: "Thunder Bolts FC",
        role: "Captain",
        members: 8,
        matches: 12,
        wins: 8,
        created: "2024-01-15",
        description: "Competitive football team from Dhaka"
      },
      {
        id: '2', 
        name: "Lightning Strikers",
        role: "Player",
        members: 11,
        matches: 15,
        wins: 10,
        created: "2024-02-20",
        description: "Weekend warriors and friendly competitors"
      }
    ];

    const initialMembers: TeamMember[] = [
      { 
        id: '1', 
        name: user?.name || "Ahmed Rahman", 
        email: user?.email || "ahmed@example.com", 
        role: "Captain", 
        position: "Forward",
        joinDate: "2024-01-15",
        avatar: user?.name?.charAt(0) || "A"
      },
      { 
        id: '2', 
        name: "Sakib Hassan", 
        email: "sakib@example.com", 
        role: "Vice Captain", 
        position: "Midfielder",
        joinDate: "2024-01-20",
        avatar: "S"
      },
      { 
        id: '3', 
        name: "Rafiq Ahmed", 
        email: "rafiq@example.com", 
        role: "Player", 
        position: "Defender",
        joinDate: "2024-01-25",
        avatar: "R"
      },
      { 
        id: '4', 
        name: "Karim Islam", 
        email: "karim@example.com", 
        role: "Player", 
        position: "Goalkeeper",
        joinDate: "2024-02-01",
        avatar: "K"
      }
    ];

    const initialInvitations: Invitation[] = [
      {
        id: '1',
        email: 'newplayer@example.com',
        teamName: 'Thunder Bolts FC',
        status: 'pending',
        sentDate: '2024-05-30'
      }
    ];

    const initialMatches: UpcomingMatch[] = [
      {
        id: '1',
        opponent: 'City Warriors FC',
        date: '2024-06-15',
        time: '16:00',
        venue: 'Champions Arena',
        type: 'friendly',
        status: 'confirmed'
      },
      {
        id: '2',
        opponent: 'Dhaka United',
        date: '2024-06-22',
        time: '18:00',
        venue: 'Sports Complex',
        type: 'tournament',
        status: 'pending'
      },
      {
        id: '3',
        opponent: 'Bengal Tigers',
        date: '2024-06-29',
        time: '15:30',
        venue: 'Elite Ground',
        type: 'league',
        status: 'confirmed'
      }
    ];

    setMyTeams(initialTeams);
    setTeamMembers(initialMembers);
    setInvitations(initialInvitations);
    setUpcomingMatches(initialMatches);
    setSelectedTeam(initialTeams[0]);
  }, [user]);

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a team name",
        variant: "destructive"
      });
      return;
    }

    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamName,
      role: "Captain",
      members: 1,
      matches: 0,
      wins: 0,
      created: new Date().toISOString().split('T')[0],
      description: teamDescription
    };

    setMyTeams(prev => [...prev, newTeam]);
    
    // Add creator as captain
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: user?.name || "Player",
      email: user?.email || "player@example.com",
      role: "Captain",
      position: "Captain",
      joinDate: new Date().toISOString().split('T')[0],
      avatar: user?.name?.charAt(0) || "P"
    };

    setTeamMembers(prev => [...prev, newMember]);

    toast({
      title: "Team Created!",
      description: `${teamName} has been created successfully`,
    });
    
    setTeamName('');
    setTeamDescription('');
    setIsCreatingTeam(false);
    setSelectedTeam(newTeam);
  };

  const handleInvitePlayer = () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Error", 
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTeam) {
      toast({
        title: "Error",
        description: "Please select a team first",
        variant: "destructive"
      });
      return;
    }

    const newInvitation: Invitation = {
      id: Date.now().toString(),
      email: inviteEmail,
      teamName: selectedTeam.name,
      status: 'pending',
      sentDate: new Date().toISOString().split('T')[0]
    };

    setInvitations(prev => [...prev, newInvitation]);

    toast({
      title: "Invitation Sent!",
      description: `Invitation sent to ${inviteEmail}`,
    });
    
    setInviteEmail('');
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
    toast({
      title: "Member Removed",
      description: "Team member has been removed",
    });
  };

  const handlePromotePlayer = (memberId: string) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, role: member.role === 'Player' ? 'Vice Captain' : 'Player' as 'Captain' | 'Vice Captain' | 'Player' }
        : member
    ));
    toast({
      title: "Role Updated",
      description: "Player role has been updated",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Captain': return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'Vice Captain': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <Star className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Captain': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Vice Captain': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMatchTypeBadge = (type: string) => {
    switch (type) {
      case 'tournament': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'league': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Upcoming Matches Section */}
      <Card className="backdrop-blur-2xl bg-gradient-to-br from-blue-50/60 via-white/40 to-purple-50/60 border border-white/30 rounded-3xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Calendar className="w-6 h-6 mr-3 text-blue-600" />
            Upcoming Matches
            <Badge className="ml-auto bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl">
              {upcomingMatches.length} Matches
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <div key={match.id} className="p-6 rounded-3xl bg-white/50 border border-white/20 hover:bg-white/70 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">vs {match.opponent}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {match.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {match.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {match.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getMatchTypeBadge(match.type)} rounded-2xl px-3 py-1`}>
                      {match.type}
                    </Badge>
                    <Badge className={`${
                      match.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    } rounded-2xl px-3 py-1`}>
                      {match.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">No upcoming matches scheduled</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Team Section */}
      <Card className="backdrop-blur-2xl bg-gradient-to-br from-emerald-50/60 via-white/40 to-teal-50/60 border border-white/30 rounded-3xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Users className="w-6 h-6 mr-3 text-emerald-600" />
            Team Management
            <Badge className="ml-auto bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-2xl">
              {myTeams.length} Teams
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isCreatingTeam ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setIsCreatingTeam(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl px-8 py-3 shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Team
              </Button>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Name *</label>
                <Input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name..."
                  className="rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <Input
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  placeholder="Brief description of your team..."
                  className="rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleCreateTeam}
                  disabled={!teamName.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl disabled:opacity-50"
                >
                  Create Team
                </Button>
                <Button
                  onClick={() => {
                    setIsCreatingTeam(false);
                    setTeamName('');
                    setTeamDescription('');
                  }}
                  variant="outline"
                  className="rounded-2xl border-gray-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Teams */}
      {myTeams.length > 0 && (
        <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center text-xl">
              <Users className="w-6 h-6 mr-3 text-emerald-600" />
              My Teams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myTeams.map((team) => (
              <div 
                key={team.id} 
                className={`p-6 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  selectedTeam?.id === team.id 
                    ? 'bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border-emerald-200 shadow-lg' 
                    : 'bg-white/50 border-white/20 hover:bg-white/70'
                }`}
                onClick={() => setSelectedTeam(team)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{team.name}</h3>
                      <Badge className={`${getRoleBadgeColor(team.role)} rounded-2xl px-3 py-1`}>
                        {team.role}
                      </Badge>
                    </div>
                    {team.description && (
                      <p className="text-sm text-gray-600 mb-2">{team.description}</p>
                    )}
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>{team.members} members</span>
                      <span>{team.matches} matches</span>
                      <span>{team.wins} wins</span>
                      <span>Created: {team.created}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-2xl border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {team.role === 'Captain' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-2xl border-red-200 text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMyTeams(prev => prev.filter(t => t.id !== team.id));
                          if (selectedTeam?.id === team.id) {
                            setSelectedTeam(myTeams[0] || null);
                          }
                          toast({
                            title: "Team Deleted",
                            description: `${team.name} has been deleted`,
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Team Members & Invite */}
      {selectedTeam && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Team Members */}
          <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center text-xl">
                <Users className="w-6 h-6 mr-3 text-emerald-600" />
                {selectedTeam.name} Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-800">{member.name}</h4>
                          {getRoleIcon(member.role)}
                        </div>
                        <p className="text-sm text-gray-600">{member.position}</p>
                        <p className="text-xs text-gray-500">Joined: {member.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getRoleBadgeColor(member.role)} rounded-2xl px-3 py-1 text-xs`}>
                        {member.role}
                      </Badge>
                      {selectedTeam.role === 'Captain' && member.id !== '1' && (
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePromotePlayer(member.id)}
                            className="rounded-xl text-xs px-2 py-1"
                          >
                            {member.role === 'Player' ? 'Promote' : 'Demote'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveMember(member.id)}
                            className="rounded-xl text-xs px-2 py-1 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invite Players */}
          <Card className="backdrop-blur-2xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center text-xl">
                <UserPlus className="w-6 h-6 mr-3 text-blue-600" />
                Invite Players
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Player Email</label>
                <div className="flex space-x-3">
                  <Input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="player@example.com"
                    className="flex-1 rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm"
                  />
                  <Button
                    onClick={handleInvitePlayer}
                    disabled={!inviteEmail.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl px-6 disabled:opacity-50"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>
              
              {/* Pending Invitations */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Pending Invitations</h4>
                <div className="space-y-2">
                  {invitations.filter(inv => inv.status === 'pending').map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between p-3 bg-yellow-50/80 rounded-2xl border border-yellow-200">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{invitation.email}</p>
                        <p className="text-xs text-gray-600">Sent: {invitation.sentDate}</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 rounded-2xl">
                        Pending
                      </Badge>
                    </div>
                  ))}
                  {invitations.filter(inv => inv.status === 'pending').length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No pending invitations</p>
                  )}
                </div>
              </div>
              
              <div className="text-center py-8">
                <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">Build your dream team</p>
                <p className="text-sm text-gray-500">Invite players via email to join your team</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
